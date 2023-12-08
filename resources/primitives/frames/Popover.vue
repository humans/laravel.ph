<script setup lang="ts">
import { autoUpdate, computePosition, offset } from "@floating-ui/dom"
import { nextTick, onMounted, ref, toRefs, watch } from "vue"
import { closeFrame } from "@primitives/frames"

type Props = {
    frame: InertiaFrame
}

const props = defineProps<Props>()

const { frame } = toRefs(props)

const $popover = ref()

let cleanup

onMounted(() => {
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeFrame(frame.value)
        }
    })
})

function updatePosition() {
    computePosition(frame.value.reference, $popover.value!, {
        middleware: [offset({ mainAxis: 16 })],
        placement: frame.value.placement ?? "bottom-start",
    }).then(({ x, y }) => {
        Object.assign($popover.value!.style, {
            left: `${x}px`,
            top: `${y}px`,
        })
    })
}

watch(
    () => frame.value.active,
    (active) => {
        if (!active) {
            cleanup && cleanup()
        } else {
            nextTick(() => {
                cleanup = autoUpdate(frame.value.reference, $popover.value!, updatePosition)
            })
        }
    }
)
</script>

<template>
    <div class="popover">
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 transition"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div class="[ scrolling-disabled h-screen w-screen bg-stroke/5 fixed inset-0 z-overlay ]" @click.prevent="closeFrame(frame)" v-if="frame.active"></div>
        </Transition>

        <Transition
            enter-active-class="transition duration-300 ease-bounce"
            enter-from-class="opacity-0 scale-50"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div class="dropdown__content [ z-dropdown absolute ]" ref="$popover" v-if="frame.active">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped></style>
