<script setup lang="ts">
import { Avatar } from "@primitives/avatar"

type Props = {
    user: App.User
    hasFocus: boolean
}

defineProps<Props>()
</script>

<template>
    <button
        type="button"
        @click.prevent="$emit('select', user)"
        @mouseenter="$emit('mouseenter')"
        class="dropdown__item mention-option [ flex items-center w-full text-start rounded text-sm gap-2 ]"
        :class="{
            '[ bg-neutral-200/50 ]': hasFocus,
        }"
    >
        <Avatar :user="user" size="small" class="mention-option__avatar" />

        <span class="mention-option__name">{{ user.display_name }}</span>
    </button>
</template>

<style scoped></style>
