<script setup lang="ts">
import type { Component } from "vue"

type Props = {
    as?: string | Component
}

withDefaults(defineProps<Props>(), {
    as: "a",
})
</script>

<template>
    <Component :is="as" class="[ p-1.5 rounded text-white/90 hocus:text-white hocus:bg-accent-stroke transition hocus:ring-0 ]">
        <slot></slot>
    </Component>
</template>

<style scoped></style>
