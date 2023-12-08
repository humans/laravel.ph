export * from "./use-toasts-store"

export { default as TheToastDrawer } from "./TheToastDrawer.vue"
export { default as Toast } from "./Toast.vue"

export type ToastType = "success" | "error" | "info"

export type ToastProperty = {
    $id: string
    title?: string
    body: string
    type: ToastType
}
