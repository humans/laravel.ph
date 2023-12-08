<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

type Props = {
    rootMargin?: string
    threshold?: number
}

const { rootMargin, threshold } = withDefaults(defineProps<Props>(), {
    rootMargin: "0px",
    threshold: 1.0,
})

const emit = defineEmits(["intersect", "release"])

const $root = ref(null)

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                emit("intersect")
            } else {
                emit("release")
            }
        })
    },
    {
        rootMargin,
        threshold,
    }
)

onMounted(() => {
    observer.observe($root.value)
})

onBeforeUnmount(() => {
    observer && observer.unobserve($root.value)
})
</script>

<template>
    <div ref="$root">
        <slot></slot>
    </div>
</template>

<style scoped></style>
