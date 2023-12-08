<script setup lang="ts">
import { ButtonVariants } from "."
import type { Component } from "vue"
import { usingModifierKeys } from "@utils"
import { openFrame } from "@primitives/frames"
import Button from "./Button.vue"

type FrameOptions = {
    component: Component
    url?: string
    placement?: string
    onClose?: () => void
}

type Props = {
    look?: NonNullable<Parameters<typeof ButtonVariants>[0]>["look"]
    size?: NonNullable<Parameters<typeof ButtonVariants>[0]>["size"]
    options: FrameOptions
    href: string
}

const { href, options } = defineProps<Props>()

function handleClick(event) {
    if (usingModifierKeys(event)) {
        return
    }

    event.preventDefault()

    openFrame({
        url: href,
        reference: options.reference || event.currentTarget,
        ...options,
    })
}
</script>

<template>
    <Button as="a" :href="href" v-bind="$attrs" :look="look" :size="size" @click="handleClick">
        <slot></slot>
    </Button>
</template>

<style scoped></style>
