<script setup lang="ts">
import type { ToastType } from "."
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { useInterval } from "@vueuse/core"

type Props = {
    type: ToastType
    title?: string
    body: string
}

withDefaults(defineProps<Props>(), {
    title: "",
})

const emit = defineEmits(["close"])

const { pause, resume } = useInterval(5000, {
    controls: true,
    immediate: true,
    callback: () => emit("close"),
})

const Icon = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: ExclamationCircleIcon,
}
</script>

<template>
    <div @mouseenter="pause" @mouseleave="resume" class="toast [ ps-5 pe-8 pt-4 pb-5 text-sm bg-canvas rounded-lg shadow-2xl shadow-stroke/10 ring-1 ring-stroke/5 relative w-full ]" role="alert">
        <div class="[ flex gap-4 max-w-[18.75rem] w-full ]">
            <div class="[ shrink-0 ]">
                <Component
                    :is="Icon[type]"
                    :class="{
                        '[ ring-green-600/40 text-green-600 ]': type === 'success',
                        '[ ring-indigo-600/40 text-indigo-600 ]': type === 'info',
                        '[ ring-red-600/40 text-red-600 ]': type === 'error',
                    }"
                    class="[ h-6 w-6 ring-1 ring-offset-2 ring-offset-canvas rounded-full ]"
                />
            </div>

            <div class="[ w-full ]">
                <div v-if="title" class="toast__title [ font-medium ]">{{ title }}</div>
                <div
                    class="toast__body [ break-words pr-8 ]"
                    :class="{
                        '[ text-stroke ]': !title,
                        '[ text-muted ]': title,
                    }"
                >
                    {{ body }}
                </div>
            </div>
        </div>

        <div class="[ absolute top-3 end-4 ]">
            <button type="button" class="[ transition text-neutral-500 duration-100 hocus:text-stroke focus:ring-0 ]" @click.prevent="$emit('close')">
                <XMarkIcon class="[ h-4 w-4 stroke-2 ]" />
                <span class="[ sr-only ]">{{ $t("actions.close") }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped></style>
