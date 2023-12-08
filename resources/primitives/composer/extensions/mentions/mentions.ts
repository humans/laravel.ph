import { mergeAttributes } from "@tiptap/core"
import Mention from "@tiptap/extension-mention"
import { VueNodeViewRenderer, VueRenderer } from "@tiptap/vue-3"
import { PluginKey } from "prosemirror-state"
import { useMentionsStore } from "$app/store/mentions"
import InlineMention from "./InlineMention.vue"
import MentionsList from "./MentionsList.vue"

export const Mentions = Mention.extend({
    name: "mention",

    addNodeView() {
        return VueNodeViewRenderer(InlineMention)
    },

    renderHTML({ HTMLAttributes }) {
        return ["mention", mergeAttributes(HTMLAttributes)]
    },

    parseHTML() {
        return [
            {
                getAttrs: (element) => ({
                    "data-type": "mention",
                    id: element.getAttribute("data-id"),
                }),
            },
        ]
    },
}).configure({
    suggestion: {
        pluginKey: new PluginKey("mention"),
        allowSpaces: false,
        startOfLine: false,
        char: "@",

        items: ({ query }) => {
            const { mentions } = useMentionsStore()

            return mentions.filter((item) => item.display_name.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
        },

        render: () => {
            let component

            return {
                onStart: (props) => {
                    component = new VueRenderer(MentionsList, {
                        props,
                        editor: props.editor,
                    })

                    if (!props.clientRect) {
                        return
                    }

                    document.body.appendChild(component.element)
                },

                onUpdate(props) {
                    component.updateProps(props)

                    if (!props.clientRect) {
                        return
                    }
                },

                onKeyDown(props) {
                    if (props.event.key === "Escape") {
                        component.destroy()
                        return true
                    }

                    return component.ref?.onKeyDown(props)
                },

                onExit() {
                    component.destroy()
                },
            }
        },
    },
})
