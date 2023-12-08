<script setup lang="ts">
import { inject } from "vue"

type Type = "text" | "email"

type Props = {
    id?: string | null
    modelValue: any
}

const props = withDefaults(defineProps<Props>(), {
    id: "",
    type: "text",
    modelValue: "",
})

defineEmits(["update:modelValue"])

const id = props.id ?? inject("field/id", "")
</script>

<template>
    <textarea
        :id="id"
        class="[ bg-canvas border border-stroke/5 shadow-sm px-4 py-2 rounded w-full resize-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:ring-stroke focus:border-stroke/5 transition duration-100 ]"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<style scoped></style>
