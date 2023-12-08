<script setup lang="ts">
import { NodeViewWrapper } from "@tiptap/vue-3"
import FileAttachment from "./FileAttachment.vue"
import ImageAttachment from "./ImageAttachment.vue"
import VideoAttachment from "./VideoAttachment.vue"

type AttachmentAttributes = {
    filename: string
    filesize: number
    mimetype: string
    type: string
    path: string
}

type Props = {
    node: {
        attrs: AttachmentAttributes
        content: object
        marks: Array
        type: object
    }
    updateAttributes: Function
}

const props = defineProps<Props>()

const Renderers = [
    {
        resolve: (type: string) => type.startsWith("image/"),
        component: ImageAttachment,
    },
    {
        resolve: (type: string) => type.startsWith("video/"),
        component: VideoAttachment,
    },
]

const renderer = Renderers.find(({ resolve }) => resolve(props.node.attrs.mimetype))
const component = renderer?.component ?? FileAttachment
</script>

<template>
    <NodeViewWrapper>
        <Component :is="component" v-bind="node.attrs" />
    </NodeViewWrapper>
</template>

<style scoped></style>
