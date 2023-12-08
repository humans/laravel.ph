<script setup lang="ts">
import { navigate } from "@utils"

type Element = "a" | "button"

type Look = "muted" | "accent"

type Props = {
    as?: Element
    look?: Look
}

const { as, href } = withDefaults(defineProps<Props>(), {
    as: "a",
    look: "muted",
})

const LinkOptions = {
    custom: "link--custom",
    muted: "link--muted [ text-muted hocus:text-stroke ]",
    accent: "link--accent [ text-accent-stroke ]",
}
</script>

<template>
    <Component :is="as" :href="href" class="link [ transition transition-colors duration-100 underline ]" :class="LinkOptions[look]" @click="navigate">
        <slot></slot>
    </Component>
</template>

<style scoped></style>
