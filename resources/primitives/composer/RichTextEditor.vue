<script setup lang="ts">
import { provide, ref } from "vue"
import { blank } from "@utils"
import Editor from "./Editor.vue"
import HorizontalToolbar from "./HorizontalToolbar.vue"

type RichTextEditorSize = "default" | "tall"
type RichTextEditorLook = "bordered" | "borderless"

type Props = {
    json: object
    html: string
    placeholder?: string | null
    expanded?: boolean
    size?: RichTextEditorSize
    look?: RichTextEditorLook
}

withDefaults(defineProps<Props>(), {
    placeholder: null,
    expanded: false,
    size: "default",
    look: "bordered",
})

defineEmits(["update:json", "update:html", "focus", "submit", "escape", "blur"])

const editor = ref()

const Size = {
    default: "rich-text-editor--default",
    tall: "rich-text-editor--tall",
}

const Look = {
    bordered: "rich-text-editor--bordered [ ring-1 ring-stroke/5 shadow-sm transition-shado ]",
    borderless: "rich-text-editor--borderless",
}

provide("editor", editor)

defineExpose({ editor })
</script>

<template>
    <div
        class="rich-text-editor [ rounded ]"
        :class="[
            Look[look],
            Size[size],
            {
                'rich-text-editor--expanded': expanded,
                '[ cursor-pointer hover:shadow-md hover:shadow-stroke/5 ]': !expanded,
            },
        ]"
    >
        <HorizontalToolbar v-if="expanded && editor" class="rich-text-editor__toolbar rich-text-editor__toolbar--horizontal" :editor="editor" />

        <div class="[ relative ]">
            <Editor
                @escape="$emit('escape')"
                @submit="$emit('submit')"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
                :json="json"
                :html="html"
                @update:json="(value) => $emit('update:json', value)"
                @update:html="(value) => $emit('update:html', value)"
            />

            <span v-if="placeholder && editor && blank(editor.getJSON())" class="rich-text-editor__placeholder [ absolute top-4 text-neutral-500 leading-relaxed leading-prose pointer-events-none ]">
                {{ placeholder }}
            </span>
        </div>
    </div>
</template>

<style lang="postcss">
.rich-text-editor:has(.node--focused) {
}

.rich-text-editor .ProseMirror {
    @apply min-h-[6rem];
}

.rich-text-editor--bordered {
    & .ProseMirror {
        @apply px-5 py-4;
    }

    & .rich-text-editor__placeholder {
        @apply start-5;
    }

    & .rich-text-editor__toolbar--horizontal {
        @apply border-b border-stroke/5;
    }
}

.rich-text-editor--borderless {
    .ProseMirror {
        @apply py-4;
    }

    & .rich-text-editor__placeholder {
        @apply start-0;
    }
}

.rich-text-editor--expanded.rich-text-editor--default .ProseMirror {
    @apply min-h-[12rem];
}

.rich-text-editor--expanded.rich-text-editor--tall .ProseMirror {
    @apply min-h-[24rem];
}
</style>
