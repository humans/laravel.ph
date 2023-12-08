<script setup lang="ts">
type Element = "h2" | "h3" | "h4" | "h5"

type Props = {
    as?: Element
}

withDefaults(defineProps<Props>(), {
    as: "h2",
})
</script>

<template>
    <Component :is="as" class="[ font-serif font-bold tracking-tighter text-2xl ]">
        <slot></slot>
    </Component>
</template>

<style scoped></style>
