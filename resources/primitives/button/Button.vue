<script setup lang="ts">
import { ButtonVariants } from "."
import { className } from "@utils"

type Tag = "a" | "button"

type Props = {
    as?: Tag
    look?: NonNullable<Parameters<typeof ButtonVariants>[0]>["look"]
    size?: NonNullable<Parameters<typeof ButtonVariants>[0]>["size"]
    disabled?: boolean
}

withDefaults(defineProps<Props>(), {
    as: "button",
    disabled: false,
})
</script>

<template>
    <Component
        data-testid="button"
        :is="as"
        :aria-disabled="disabled"
        :disabled="disabled"
        :class="[
            className(ButtonVariants({ look, size }), {
                'button--disabled [ opacity-70 pointer-events-none ]': disabled,
            }),
        ]"
    >
        <slot></slot>
    </Component>
</template>

<style scoped></style>
