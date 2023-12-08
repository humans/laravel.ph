<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import { inject, useAttrs } from "vue"
import { className } from "@utils"

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<{
    modelValue?: string | number
    defaultValue?: string | number
    id?: string
    error?: boolean
}>()

const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void
}>()

const { class: classes, ...attrs } = useAttrs()

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
    error: false,
})

const id = props.id ?? inject("field/id") ?? ""
const error = props.error ?? inject("field/error") ?? false
</script>

<template>
    <input
        v-model="modelValue"
        :id="id"
        :class="
            className(
                'input [ placeholder:text-muted/80 bg-canvas border border-stroke/5 focus:border-stroke/5 shadow-sm px-4 py-2 rounded w-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:ring-stroke transition duration-100 ]',
                {
                    'input--has-error [ border-red-600 ]': error,
                },
                classes ?? ''
            )
        "
        v-bind="attrs"
    />
</template>
