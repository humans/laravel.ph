<script setup lang="ts">
type BannerLook = "neutral" | "danger"

type Props = {
    look?: BannerLook
}

withDefaults(defineProps<Props>(), {
    look: "neutral",
})

const LookOptions: Choices<BannerLook> = {
    neutral: "banner--neutral [ bg-neutral-100 text-neutral-800 ]",
    danger: "banner--danger [ bg-danger-canvas/50 text-danger-stroke ]",
}
</script>

<template>
    <div class="banner [ py-3 text-sm ]" :class="[LookOptions[look]]">
        <slot></slot>
    </div>
</template>

<style scoped></style>
