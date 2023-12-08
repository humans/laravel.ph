<script setup lang="ts">
import axios from "axios"
import { Head, router } from "@inertiajs/vue3"
import { onBeforeUnmount, onMounted } from "vue"
import { $api, $user } from "$app/store/page"
import { useEcho } from "$app/store/use-echo"

defineOptions({
    inheritAttrs: false,
})

type Props = {
    title: string
    as?: string
    signals?: string[]
    noReload?: boolean
}

const { signals, noReload } = withDefaults(defineProps<Props>(), {
    as: "div",
    signals: [],
    noReload: false,
})

const emit = defineEmits(["echo"])

async function markSignalsAsRead() {
    if (signals.length === 0) {
        return
    }

    const response = await axios.post($api.value.notification_reading_store_path, {
        signals,
    })

    $user.value.unread_notifications_count = response.data.unread_notifications_count
}

const { listen, leave } = useEcho()

onMounted(() => {
    markSignalsAsRead()

    listen(signals, (event) => {
        markSignalsAsRead()

        emit("echo", { event })

        if (noReload) {
            return
        }

        router.reload({
            preserveScroll: true,
            preserveState: true,
        })
    })
})

onBeforeUnmount(() => {
    leave(signals)
})
</script>

<template>
    <Head :title="title" />

    <Component :is="as" class="page [ pt-8 pb-48 ]" v-bind="$attrs">
        <slot></slot>
    </Component>
</template>

<style scoped></style>
