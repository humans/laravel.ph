<script setup lang="ts">
import { useSlots } from "vue"

const slots = useSlots()

const hasActions = !!slots["actions"]
</script>

<template>
    <header
        class="page-header [ flex w-full ]"
        :class="{
            '[ justify-between  ]': hasActions,
        }"
    >
        <div
            :class="{
                '[ w-full ]': !hasActions,
                '[ max-w-md ]': hasActions,
            }"
        >
            <slot></slot>
        </div>

        <div class="page-header__actions" v-if="hasActions">
            <slot name="actions"></slot>
        </div>
    </header>
</template>

<style scoped></style>
