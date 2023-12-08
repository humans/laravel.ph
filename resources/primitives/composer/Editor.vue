<script setup lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3"
import { inject, Ref, ref } from "vue"
import { useToastsStore } from "@primitives/toast"
import { $api } from "$app/store/page"
import { useFileUpload } from "./extensions/attachments"
import { useExtensions } from "./extensions/use-extensions"

type Props = {
    json: object
    html: string
}

const props = defineProps<Props>()

const emit = defineEmits(["update:json", "update:html", "focus", "blur", "escape", "submit"])

const toasts = useToastsStore()

const extensions = useExtensions({
    emit,
})

const editor: Ref<Editor | null> = inject("editor", ref(null))

editor.value = new Editor({
    extensions,

    content: props.json,

    onFocus() {
        emit("focus")
    },

    onBlur() {
        emit("blur")
    },

    onUpdate({ editor }) {
        emit("update:json", editor.getJSON())
        emit("update:html", editor.getHTML())
    },
})

const { paste, drop } = useFileUpload({
    endpoint: $api.value.attachments_store_path,

    onUpload: (nodes) => {
        editor.value.chain().focus().insertContent(nodes).run()
    },

    onUploadError: ({ response }) => {
        toasts.error({
            body: response.data.message,
        })
    },

    onValidationError: (e) => {
        toasts.error({
            body: e,
        })
    },
})

editor.value.setOptions({
    editorProps: {
        handleDOMEvents: { paste, drop },
    },
})

defineExpose({
    editor,
})
</script>

<template>
    <EditorContent :editor="editor" class="[ prose code-block--device ]" />
</template>

<style scoped></style>
