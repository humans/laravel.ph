<script setup lang="ts">
import { provide } from "vue"
import { ContentContainer } from "@primitives/content-container"
import { closeFrame } from "@primitives/frames"
import DialogPanel from "./DialogPanel.vue"

type Props = {
    frame: InertiaFrame
}

const { frame } = defineProps<Props>()

const close = () => closeFrame(frame)

provide("dialog::close", close)
provide("dialog::frame", frame)
</script>

<template>
    <div class="dialog [ scrolling-disabled h-screen w-screen inset-0 fixed z-dialog flex justify-center md:items-start md:pt-16 p-8 overflow-y-auto ]">
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 transition"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="frame.active" class="dialog__overlay [ fixed h-screen w-screen inset-0 bg-black/20 backdrop-blur z-dialog ]"></div>
        </Transition>

        <Transition
            enter-active-class="transition duration-300 ease-out origin-top"
            enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-90"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition duration-200 ease-in origin-top"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100 "
            leave-to-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
        >
            <div class="dialog__wrapper [ relative w-full z-dialog ]" v-if="frame.active">
                <ContentContainer padding="none" :wrap="frame.wrap ?? 'dialog'">
                    <DialogPanel>
                        <slot></slot>
                    </DialogPanel>
                </ContentContainer>
            </div>
        </Transition>
    </div>
</template>

<style scoped></style>
