import { defineStore } from "pinia"
import { v4 as uuid } from "uuid"
import { ref } from "vue"
import { ToastProperty, ToastType } from "./index"

type ToastParameter = {
    title?: string
    body: string
    type?: ToastType
}

export const useToastsStore = defineStore("toasts", () => {
    const toasts = ref([] as ToastProperty[])

    function push(toast: ToastParameter) {
        toasts.value.push({
            $id: uuid(),
            title: toast.title,
            body: toast.body,
            type: toast.type!,
        })
    }

    function success(toast: ToastParameter) {
        push({ ...toast, type: "success" })
    }

    function info(toast: ToastParameter) {
        push({ ...toast, type: "info" })
    }

    function error(toast: ToastParameter) {
        push({ ...toast, type: "error" })
    }

    function close({ $id }: ToastProperty) {
        toasts.value = toasts.value.filter((toast) => toast.$id !== $id)
    }

    return { toasts, success, info, error, close, push }
})
