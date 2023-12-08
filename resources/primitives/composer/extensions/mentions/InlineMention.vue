<script setup lang="ts">
import { HTMLElement } from "@tiptap/core"
import { NodeViewWrapper } from "@tiptap/vue-3"
import { ref, toRef, watch } from "vue"
import { Avatar } from "@primitives/avatar"
import { Spinner } from "@primitives/spinner"
import { useUserQuickLookStore } from "$app/components/user-quick-look"
import { useMentionsStore } from "$app/store/mentions"

type MentionAttributes = {
    id: number
    label: string
}

type Props = {
    node: {
        attrs: MentionAttributes
        content: object
        marks: Array
        type: object
    }
    updateAttributes: Function
}

const { node } = defineProps<Props>()

const { openQuickLook, closeQuickLook } = useUserQuickLookStore()
const store = useMentionsStore()

const processing = toRef(store, "processing")

const user = ref<User | undefined | null>(null)

const $root = ref<HTMLElement | null>(null)

watch(
    () => store.processing,
    (processing) => {
        if (!processing) {
            user.value = store.findById(node.attrs.id)
        }
    },
    { immediate: true }
)

function handleMouseEnter() {
    openQuickLook($root.value, user.value)
}

function handleMouseLeave() {
    closeQuickLook()
}
</script>

<template>
    <NodeViewWrapper as="span">
        <span class="[ hover:cursor-pointer ]" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter" ref="$root">
            <span class="[ inline-flex items-center ]" v-if="processing">
                <Spinner class="[ h-4 w-4 me-[0.5ch] ]" />
                <span>{{ node.attrs.label }}</span>
            </span>

            <span v-else-if="user" class="[ inline-flex items-center ]">
                <Avatar :user="user" size="mention" class="[ me-[0.5ch] ]" />
                <span>{{ user.display_name }}</span>
            </span>

            <span v-else-if="!user"> @{{ node.attrs.label }} </span>
        </span>
    </NodeViewWrapper>
</template>

<style scoped></style>
