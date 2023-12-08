<script setup lang="ts">
import { FieldMessageVariants } from "."
import { className } from "@utils"

type Props = {
    look?: NonNullable<Parameters<typeof FieldMessageVariants>[0]>["look"]
}

defineProps<Props>()
</script>

<template>
    <p class="field-message [ text-sm ]" :class="className(FieldMessageVariants({ look }))">
        <slot></slot>
    </p>
</template>

<style scoped></style>
