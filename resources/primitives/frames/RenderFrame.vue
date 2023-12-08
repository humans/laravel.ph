<script setup>
import { inject, onMounted, ref, toRefs } from "vue"
import { useFramesStore } from "./use-frames-store"

const props = defineProps(["frame"])

const { frame } = toRefs(props)

const pages = inject("inertia-frames-vue::pages")

const frames = useFramesStore()

const component = ref()

const status = ref("processing")

onMounted(() => {
    pages[`${frame.value.page.path}.vue`]().then((module) => {
        component.value = module.default

        status.value = "rendered"

        frames.markAsLoaded(frame.value)
    })
})
</script>

<template>
    <Component
        v-if="frame.loaded"
        :is="component"
        v-bind="{
            ...frame.page.properties,
            frame,
        }"
    />
</template>

<style scoped></style>
