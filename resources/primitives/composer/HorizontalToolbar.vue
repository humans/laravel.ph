<script setup lang="ts">
import { Editor } from "@tiptap/vue-3"
import { nextTick, ref, toRefs } from "vue"
import { useI18n } from "vue-i18n"
import {
    Attachment,
    Bold,
    Italic,
    At,
    CodeBlock,
    CodeInline,
    H2,
    H4,
    H3,
    DoubleQuotesLeft,
    ListOrdered,
    ListUnordered,
    Separator,
    Strikethrough,
    Underline,
    Sketching,
    Square,
    ListCheck,
} from "@icons/editor"
import ToolbarButton from "./ToolbarButton.vue"

type Props = {
    editor: Editor
}

const props = defineProps<Props>()

const { editor } = toRefs(props)

const $file = ref()

const i18n = useI18n()

const commands = [
    {
        icon: Bold,
        id: "bold",
        name: i18n.t("components.editor.commands.bold.text"),
        alt: i18n.t("components.editor.commands.bold.alt"),
        active: () => editor.value.isActive("bold"),
        action: () => editor.value.chain().toggleBold().focus().run(),
        hotkeys: {
            apple: "⌘B",
            windows: "control+b",
        },
    },
    {
        icon: Italic,
        id: "italic",
        name: i18n.t("components.editor.commands.italic.text"),
        alt: i18n.t("components.editor.commands.italic.alt"),
        active: () => editor.value.isActive("italic"),
        action: () => editor.value.chain().toggleItalic().focus().run(),
        hotkeys: {
            apple: "⌘I",
            windows: "control+i",
        },
    },
    {
        icon: Underline,
        id: "underline",
        name: i18n.t("components.editor.commands.underline.text"),
        alt: i18n.t("components.editor.commands.underline.alt"),
        active: () => editor.value.isActive("underline"),
        action: () => editor.value.chain().toggleUnderline().focus().run(),
        hotkeys: {
            apple: "⌘U",
            windows: "control+u",
        },
    },
    {
        icon: Strikethrough,
        id: "strikethrough",
        name: i18n.t("components.editor.commands.strikethrough.text"),
        alt: i18n.t("components.editor.commands.strikethrough.alt"),
        active: () => editor.value.isActive("strike"),
        action: () => editor.value.chain().toggleStrike().focus().run(),
        hotkeys: {
            apple: "⌘⇧X",
            windows: "control+shift+x",
        },
    },
    {
        icon: CodeInline,
        id: "inline-code",
        name: i18n.t("components.editor.commands.inline-code.text"),
        alt: i18n.t("components.editor.commands.inline-code.alt"),
        active: () => editor.value.isActive("code"),
        action: () => editor.value.chain().toggleCode().focus().run(),
        hotkeys: {
            apple: "⌘E",
            windows: "control+shift+c",
        },
    },
    {
        icon: CodeBlock,
        id: "code-block",
        name: i18n.t("components.editor.commands.code-block.text"),
        alt: i18n.t("components.editor.commands.code-block.alt"),
        active: () => editor.value.isActive("codeBlock"),
        action: () => editor.value.chain().toggleCodeBlock().focus().run(),
        hotkeys: {
            apple: "⌘⇧C",
            windows: "control+shift+c",
        },
    },
    {
        icon: H2,
        id: "heading-2",
        name: i18n.t("components.editor.commands.heading.text", { level: 2 }),
        alt: i18n.t("components.editor.commands.heading.alt", { level: 2 }),
        class: "h-8 w-10 flex items-center justify-center",
        active: () => editor.value.isActive("heading", { level: 2 }),
        action: () => editor.value.chain().toggleHeading({ level: 2 }).focus().run(),
        hotkeys: {
            apple: "⌘⌥2",
            windows: "control+alt+2",
        },
    },
    {
        icon: H3,
        id: "heading-3",
        name: i18n.t("components.editor.commands.heading.text", { level: 3 }),
        alt: i18n.t("components.editor.commands.heading.alt", { level: 3 }),
        class: "h-8 w-10 flex items-center justify-center",
        active: () => editor.value.isActive("heading", { level: 3 }),
        action: () => editor.value.chain().toggleHeading({ level: 3 }).focus().run(),
        hotkeys: {
            apple: "⌘⌥3",
            windows: "control+alt+3",
        },
    },
    {
        icon: H4,
        id: "heading-4",
        name: i18n.t("components.editor.commands.heading.text", { level: 4 }),
        alt: i18n.t("components.editor.commands.heading.alt", { level: 4 }),
        class: "h-8 w-10 flex items-center justify-center",
        active: () => editor.value.isActive("heading", { level: 4 }),
        action: () => editor.value.chain().toggleHeading({ level: 4 }).focus().run(),
        hotkeys: {
            apple: "⌘⌥4",
            windows: "control+alt+4",
        },
    },
    {
        icon: Sketching,
        id: "highlight",
        name: i18n.t("components.editor.commands.highlight.text"),
        alt: i18n.t("components.editor.commands.highlight.alt"),
        class: "h-8 w-10 flex items-center justify-center",
        active: (open) => editor.value.isActive("highlight") || open.value,
        action: (open) => (open.value = !open.value),
        options: [
            ...["yellow", "blue", "green", "pink", "purple", "orange", "neutral"].map((color) => {
                const LUT = {
                    yellow: "text-yellow-400",
                    blue: "text-blue-400",
                    green: "text-emerald-400",
                    pink: "text-pink-400",
                    purple: "text-purple-400",
                    orange: "text-orange-400",
                    neutral: "text-neutral-400",
                }

                return {
                    icon: Square,
                    id: `highlight-${color}`,
                    name: i18n.t(`components.editor.commands.highlight-${color}.text`),
                    alt: i18n.t(`components.editor.commands.highlight-${color}.alt`),
                    class: `h-8 w-10 flex items-center justify-center ${LUT[color]}`,
                    active: () => editor.value.isActive("highlight", { color }),
                    action: () => {
                        if (editor.value.isActive("highlight", { color })) {
                            editor.value.chain().unsetHighlight().focus().run()
                        } else {
                            editor.value.chain().setHighlight({ color }).focus().run()
                        }
                    },
                }
            }),
        ],
    },
    {
        icon: DoubleQuotesLeft,
        id: "blockquote",
        name: i18n.t("components.editor.commands.blockquote.text"),
        alt: i18n.t("components.editor.commands.blockquote.alt"),
        active: () => editor.value.isActive("blockquote"),
        action: () => editor.value.chain().toggleBlockquote().focus().run(),
        hotkeys: {
            apple: "⌘⇧B",
            windows: "control+shift+b",
        },
    },
    {
        icon: ListUnordered,
        id: "bullet-list",
        name: i18n.t("components.editor.commands.bullet-list.text"),
        alt: i18n.t("components.editor.commands.bullet-list.alt"),
        active: () => editor.value.isActive("bulletList"),
        action: () => editor.value.chain().toggleBulletList().focus().run(),
    },
    {
        icon: ListOrdered,
        id: "number-list",
        name: i18n.t("components.editor.commands.number-list.text"),
        alt: i18n.t("components.editor.commands.number-list.alt"),
        active: () => editor.value.isActive("orderedList"),
        action: () => editor.value.chain().toggleOrderedList().focus().run(),
    },
    {
        icon: ListCheck,
        id: "task-list",
        name: i18n.t("components.editor.commands.task-list.text"),
        alt: i18n.t("components.editor.commands.task-list.alt"),
        active: () => editor.value.isActive("taskList"),
        action: () => editor.value.chain().toggleTaskList().focus().run(),
    },
    {
        icon: Separator,
        id: "divider",
        name: i18n.t("components.editor.commands.divider.text"),
        alt: i18n.t("components.editor.commands.divider.alt"),
        active: () => false,
        action: () => editor.value.chain().setHorizontalRule().focus().run(),
    },
    {
        icon: At,
        id: "mention",
        name: i18n.t("components.editor.commands.mention.text"),
        alt: i18n.t("components.editor.commands.mention.alt"),
        active: () => false,
        action: () => {
            if (editor.value.getText().endsWith(" ") || editor.value.isEmpty) {
                editor.value.chain().insertContent("@").focus().run()
            } else {
                editor.value.chain().insertContent(" @").focus().run()
            }
        },
    },
    {
        icon: Attachment,
        id: "upload-attachments",
        name: i18n.t("components.editor.commands.attachment.text"),
        alt: i18n.t("components.editor.commands.attachment.alt"),
        active: () => false,
        action: () => {
            $file.value.click()
        },
    },
]

function handleFileUpload(event) {
    if (event.target.files.length === 0) {
        return
    }

    editor.value.commands.uploadFiles(event)

    nextTick(() => {
        $file.value.value = null
    })
}
</script>

<template>
    <div>
        <div v-if="editor" class="[ flex flex-wrap ]">
            <ToolbarButton v-for="command in commands" :key="command.id" :command="command" />
        </div>

        <label for="toolbar-files" class="[ sr-only ]">{{ $t("components.editor.commands.attachment.text") }}</label>
        <input id="toolbar-files" type="file" ref="$file" @input="handleFileUpload" multiple class="[ sr-only ]" tabindex="-1" />
    </div>
</template>

<style scoped></style>
