<script setup lang="ts">
type HTMLTag = "h1" | "h2" | "h3"

type Props = {
    as?: HTMLTag
}

withDefaults(defineProps<Props>(), {
    as: "h2",
})
</script>

<template>
    <Component :is="as" class="dialog-heading [ font-serif font-bold text-xl tracking-tighter ]">
        <slot></slot>
    </Component>
</template>

<style scoped></style>
