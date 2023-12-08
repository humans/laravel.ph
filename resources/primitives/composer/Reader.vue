<script setup lang="ts">
import { EditorContent, useEditor } from "@tiptap/vue-3"
import { watch } from "vue"
import { useExtensions } from "./extensions/use-extensions"

type ReaderSize = "default" | "small"

type Props = {
    content: object
    size?: ReaderSize
}

const props = withDefaults(defineProps<Props>(), {
    size: "default",
})

const extensions = useExtensions({})

const editor = useEditor({
    content: props.content,
    editable: false,
    extensions,
    onTransaction() {
        editor.value.view.dom.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.stopPropagation()
            })

            link.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.stopPropagation()
                }
            })
        })
    },
})

watch(
    () => props.content,
    (content) => {
        editor.value.commands.setContent(content)
    }
)

const Size = {
    default: "prose--default",
    small: "prose--small",
}

defineExpose({
    editor,
})
</script>

<template>
    <EditorContent :editor="editor!" class="[ prose prose--readonly code-block--device ]" :class="[Size[size]]" />
</template>

<style scoped></style>
