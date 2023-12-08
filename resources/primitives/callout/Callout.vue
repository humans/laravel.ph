<script setup lang="ts">
import { ExclamationMark } from "@icons/special"

type Look = "info"

const LookChoices: Choices<Look> = {
    info: "callout--info [ bg-neutral-100/50 font-medium text-muted ]",
}

type Props = {
    look?: Look
}

withDefaults(defineProps<Props>(), {
    look: "info",
})
</script>

<template>
    <div class="callout [ px-10 py-6 rounded-xl relative fon-medium leading-relaxed ]" :class="LookChoices[look]">
        <div class="[ absolute -translate-y-1/3 -translate-x-1/3 top-0 start-0 ]">
            <div class="[ h-8 w-8 border-[6px] border-canvas box-content rounded-full flex items-center justify-center bg-neutral-100 ]">
                <ExclamationMark class="[ h-4 w-4 text-stroke ]" />
            </div>
        </div>

        <div class="[ text-sm ]">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped></style>
