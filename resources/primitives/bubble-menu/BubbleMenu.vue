<script setup lang="ts">
import { computePosition, FloatingElement, ReferenceElement } from "@floating-ui/dom"
import { nextTick, ref } from "vue"

const $root = ref<HTMLElement | null>(null)
const $reference = ref<ReferenceElement | null>(null)
const $floating = ref<FloatingElement | null>(null)
const open = ref(false)

function updatePosition() {
    computePosition($reference.value!, $floating.value!).then(({ x, y }) => {
        Object.assign($floating.value!.style, {
            left: `${x}px`,
            top: `${y}px`,
        })
    })
}

function handleEnter() {
    open.value = true

    nextTick(() => {
        Object.assign($floating.value!.style, {
            position: "absolute",
        })

        updatePosition()
    })
}

function handleFocusOut(event) {
    if ($root.value!.contains(event.relatedTarget)) {
        return
    }

    open.value = false
}

function handleMouseLeave() {
    open.value = false
}
</script>

<template>
    <div class="bubble-menu" @mouseenter="handleEnter" @mouseleave="handleMouseLeave" @focusin="handleEnter" @focusout="handleFocusOut" ref="$root">
        <div class="bubble-menu__reference" ref="$reference">
            <slot></slot>
        </div>

        <Transition
            enter-active-class="transition duration-100 ease-out origin-top"
            enter-from-class="opacity-0 scale-50"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-75 ease-in origin-top"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-50"
        >
            <div class="bubble-menu__controls [ absolute ]" ref="$floating" v-if="open">
                <slot name="controls"></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped></style>
