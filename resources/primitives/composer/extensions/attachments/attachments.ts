import { mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"
import { $api } from "$app/store/page.ts"
import { default as AttachmentComponent } from "./Attachment.vue"
import { useFileUpload } from "./use-file-upload"

export const Attachments = Node.create({
    name: "attachment",

    group() {
        return "block"
    },

    draggable: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    addAttributes() {
        return {
            "data-file": {
                default: "",
            },
            id: {
                default: "",
            },
            filename: {
                default: "",
            },
            filesize: {
                default: 0,
            },
            mimetype: {
                default: "",
            },
            type: {
                default: "file",
            },
            path: {
                default: "",
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: "a",
                getAttrs: (node) => node.hasAttribute("data-file"),
            },
        ]
    },

    addCommands() {
        return {
            uploadFiles:
                (event) =>
                ({ commands, editor }) => {
                    const { fileUpload } = useFileUpload({
                        endpoint: $api.value.attachments_store_path,

                        onUpload: (nodes) => {
                            editor.chain().focus().insertContent(nodes).run()
                        },
                    })

                    fileUpload(event, event.target.files)

                    return commands
                },
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(AttachmentComponent)
    },

    renderHTML({ HTMLAttributes }) {
        return ["attachment", mergeAttributes(HTMLAttributes)]
    },
})
