<script setup lang="ts">
type SelectSize = "small" | "default"

type Props = {
    modelValue: any
    size?: SelectSize
}

withDefaults(defineProps<Props>(), {
    size: "default",
})

defineEmits(["update:modelValue"])

const Size: Choices<SelectSize> = {
    small: "select--small [ rounded p-2 text-sm ]",
    default: "select--default [ rounded px-4 py-2 ]",
}
</script>

<template>
    <select
        class="[ bg-canvas border border-stroke/5 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:ring-stroke transition duration-100 focus:border-stroke/5 ]"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="[Size[size]]"
        :value="modelValue"
    >
        <slot></slot>
    </select>
</template>

<style scoped></style>
