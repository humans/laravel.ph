import { Extension } from "@tiptap/core"
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight"
import Focus from "@tiptap/extension-focus"
import { Highlight } from "@tiptap/extension-highlight"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { Underline } from "@tiptap/extension-underline"
import { StarterKit } from "@tiptap/starter-kit"
import bash from "highlight.js/lib/languages/bash"
import css from "highlight.js/lib/languages/css"
import javascript from "highlight.js/lib/languages/javascript"
import json from "highlight.js/lib/languages/json"
import php from "highlight.js/lib/languages/php"
import typescript from "highlight.js/lib/languages/typescript"
import xml from "highlight.js/lib/languages/xml"
import { createLowlight } from "lowlight"
import { vue } from "../syntax/vue"
import { Attachments } from "./attachments"
import { Mentions } from "./mentions/mentions"

type ExtensionOptions = {
    emit: object
}

const lowlight = createLowlight()

lowlight.register({
    javascript,
    typescript,
    vue,
    php,
    css,
    xml,
    bash,
    json,
})

export const useExtensions = (options: Partial<ExtensionOptions>) => {
    return [
        StarterKit.configure({
            codeBlock: false,
            heading: {
                levels: [2, 3, 4],
            },
        }),

        Image,

        Underline,

        Link.configure({
            HTMLAttributes: {
                class: "link",
            },
        }),

        CodeBlockLowlight.configure({
            lowlight,
            HTMLAttributes: {
                class: "hljs code-block",
            },
        }),

        Attachments,

        Mentions,

        Highlight.extend({
            addAttributes() {
                return {
                    color: {
                        default: "yellow",

                        parseHTML: (element) => element.getAttribute("data-color"),

                        renderHTML: (attributes) => {
                            return {
                                "data-color": attributes.color,
                                class: `mark mark--${attributes.color}`,
                            }
                        },
                    },
                }
            },
        }),

        TaskList.configure({
            HTMLAttributes: {
                class: "task-list",
            },
        }),
        TaskItem,

        Focus.configure({
            className: "node--focused",
            mode: "shallowest",
        }),

        Extension.create({
            name: "heading-attributes",
            atom: true,
            addGlobalAttributes() {
                return [
                    {
                        types: ["heading"],
                        attributes: {
                            id: {
                                default: null,
                            },
                        },
                    },
                ]
            },
        }),

        Extension.create({
            name: "fix-keyboard-behavior",

            addKeyboardShortcuts() {
                return {
                    Tab: ({ editor }) => {
                        if (editor.isActive("codeBlock")) {
                            return editor.commands.insertContent("\t")
                        }
                    },
                    "Shift-Enter": ({ editor }) => {
                        return editor.commands.enter()
                    },
                }
            },
        }),

        Extension.create({
            name: "submit-and-escape",

            addKeyboardShortcuts() {
                const emit =
                    options?.emit ??
                    function (name) {
                        console.error(`No emit found ${name}`)
                    }

                return {
                    "Cmd-Enter": () => {
                        emit("submit")
                        return true
                    },
                    Escape: () => {
                        emit("escape")
                        return true
                    },
                }
            },
        }),
    ]
}
