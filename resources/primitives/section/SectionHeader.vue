<script setup lang="ts">
import { useSlots } from "vue"

const slots = useSlots()

const hasActions = !!slots["actions"]
</script>

<template>
    <header class="section-header [ flex flex-col gap-4 md:flex-row md:justify-between md:items-center ]">
        <div class="[ flex flex-col gap-1 ]">
            <slot></slot>
        </div>

        <div class="section-header__actions" v-if="hasActions">
            <slot name="actions"></slot>
        </div>
    </header>
</template>

<style scoped></style>
