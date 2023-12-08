import axios from "axios"

const MaximumAllowedFileSize = 20 * 1000 * 1000 // 5MB

function toFormData(file: File) {
    const form = new FormData()

    form.append("file", file)

    return form
}

type AttachmentNode = {
    type: string
    attrs: {
        id: number
        path: string
        type: string
        filename: string
        filesize: number
        mimetype: string
    }
}

function toProseMirrorNode({ data }): AttachmentNode {
    return {
        type: "attachment",
        attrs: {
            id: data.id,
            path: data.path,
            type: data.type,
            filename: data.filename,
            filesize: data.filesize,
            mimetype: data.mimetype,
        },
    }
}

const AxiosOptions = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}

function validateSize(file: File): void {
    if (file?.size >= MaximumAllowedFileSize) {
        throw `${file?.name} size is greater than 20MB`
    }
}

type Props = {
    endpoint: string
    onUpload: Function
    onUploadError?: Function
    onValidationError?: Function
}

export const useFileUpload = ({ endpoint, onUpload, onUploadError, onValidationError }: Props) => {
    function uploadFiles(files: File[]) {
        const nodes = files.map((file) => {
            return axios
                .post(endpoint, toFormData(file), AxiosOptions)
                .then((response) => toProseMirrorNode(response))
                .catch((response) => {
                    onUploadError && onUploadError(response)
                })
        })

        Promise.all(nodes).then((nodes) => onUpload(nodes))
    }

    function validate(files: File[]) {
        try {
            files.forEach((file) => validateSize(file))
        } catch (e) {
            onValidationError && onValidationError(e)

            throw e
        }
    }

    function handleDOMEvent(event: ClipboardEvent | DragEvent, items: DataTransferItemList) {
        const files = Array.from(items)
            .filter((item) => item.kind === "file")
            .map((item) => item.getAsFile()) as File[]

        if (files.length === 0) {
            return
        }

        event.preventDefault()

        validate(files)

        uploadFiles(files)
    }

    function fileUpload(event, files) {
        files = Array.from(files)

        if (files.length === 0) {
            return
        }

        event.preventDefault()

        validate(files)

        uploadFiles(files)
    }

    return {
        fileUpload,
        paste: (view, event: ClipboardEvent) => handleDOMEvent(event, event.clipboardData!.items),
        drop: (view, event: DragEvent) => handleDOMEvent(event, event.dataTransfer!.items),
    }
}
