<script setup lang="ts">
import { FocusTrap } from "focus-trap-vue"
import hotkeys from "hotkeys-js"
import { inject, nextTick, onMounted, onUnmounted, ref } from "vue"

const $root = ref()

const close = inject("dialog::close")
const frame = inject("dialog::frame")

onMounted(() => {
    hotkeys("escape", "dialog", close)
    hotkeys.setScope("dialog")

    nextTick(() => {
        $root.value?.focus({
            preventScroll: true,
        })
    })
})

onUnmounted(() => {
    hotkeys.deleteScope("dialog")
})
</script>

<template>
    <FocusTrap :active="frame.loaded">
        <div class="[ px-8 py-7 rounded-xl bg-canvas shadow-2xl w-full focus:ring-0 focus:outline-none ]" role="dialog" tabindex="-1" ref="$root">
            <slot></slot>
        </div>
    </FocusTrap>
</template>

<style scoped></style>
