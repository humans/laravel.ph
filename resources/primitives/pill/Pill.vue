<script setup lang="ts">
type PillLook = "neutral"
type PillSize = "base" | "tiny"

type Props = {
    look?: PillLook
    size?: PillSize
}

withDefaults(defineProps<Props>(), {
    look: "neutral",
    size: "base",
})

const Look = {
    neutral: "pill--neutral [ bg-neutral-100/50 text-muted ]",
}

const Size = {
    base: "",
    tiny: "pill--tiny [ text-xs font-medium px-2 py-0.5 tracking-tight ]",
}
</script>

<template>
    <span class="pill [ inline rounded-full ]" :class="[Look[look], Size[size]]">
        <slot></slot>
    </span>
</template>

<style scoped></style>
