<script setup lang="ts">
import { Avatar, AvatarVariants } from "@primitives/avatar"

type Props = {
    users: App.User[]
    size?: NonNullable<Parameters<typeof AvatarVariants>[0]>["size"]
}

withDefaults(defineProps<Props>(), {
    size: "medium",
})
</script>

<template>
    <div class="avatar-stack [ flex ]">
        <Avatar :size="size" v-for="user in users" :user="user" :key="user.id" class="[ border border-2 border-canvas -mx-1 ]" />
    </div>
</template>

<style scoped></style>
