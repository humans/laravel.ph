<script setup lang="ts">
import { toRef, watch } from "vue"
import { $toast } from "$app/store/page"
import Toast from "./Toast.vue"
import { useToastsStore } from "./use-toasts-store"

const toastsStore = useToastsStore()

const toasts = toRef(toastsStore, "toasts")

watch(
    $toast,
    (toast) =>
        toast &&
        toastsStore.push({
            title: toast.title,
            body: toast.caption,
            type: toast.type,
        })
)
</script>

<template>
    <div class="[ fixed p-4 bottom-0 end-0 z-notification grid gap-1 max-w-[25rem] w-full select-none ]">
        <TransitionGroup name="toast">
            <Toast class="[ transition duration-200 ]" v-for="toast in toasts" :key="toast.$id" :type="toast.type" @close="() => toastsStore.close(toast)" :title="toast.title" :body="toast.body" />
        </TransitionGroup>
    </div>
</template>

<style scoped lang="postcss">
.toast-enter-from,
.toast-leave-to {
    @apply translate-y-8 opacity-0;
}
</style>
