<script setup lang="ts">
import { ButtonVariants } from "."
import { Spinner } from "@primitives/spinner"
import Button from "./Button.vue"

type Props = {
    look?: NonNullable<Parameters<typeof ButtonVariants>[0]>["look"]
    size?: NonNullable<Parameters<typeof ButtonVariants>[0]>["size"]
    processing?: boolean
    disabled?: boolean
}

withDefaults(defineProps<Props>(), {
    look: "primary",
    processing: false,
    disabled: false,
})
</script>

<template>
    <Button as="button" type="submit" v-bind="$attrs" :look="look" :size="size" :disabled="processing || disabled">
        <template v-if="processing">
            <Spinner class="[ h-4 w-4 self-center me-1.5 ]" />
        </template>

        <span>
            <slot></slot>
        </span>
    </Button>
</template>

<style scoped></style>
