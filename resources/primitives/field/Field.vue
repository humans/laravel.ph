<script setup lang="ts">
import { provide, toRefs } from "vue"
import { Label } from "@primitives/label"
import FieldMessage from "./FieldMessage.vue"

type Props = {
    label: string
    error?: string
    id: string
    hint?: string
}

const props = defineProps<Props>()

const { id, error } = toRefs(props)

provide("field/id", id)
provide("field/error", error)
</script>

<template>
    <div class="field">
        <Label :for="id" class="field__label [ leading-tight inline-block mb-1 ]">
            {{ label }}
        </Label>

        <p v-if="hint" class="field__message field__message--hint [ -mt-0.5 text-sm text-muted mb-2 ]">
            {{ hint }}
        </p>

        <div class="field__control [ relative ]">
            <slot></slot>
        </div>

        <FieldMessage look="error" v-if="error" class="field__message field__message--error [ mt-1 ]">
            {{ error }}
        </FieldMessage>
    </div>
</template>

<style scoped></style>
