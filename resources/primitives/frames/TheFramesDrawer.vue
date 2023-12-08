<script setup>
import { provide } from "vue"
import RenderFrame from "./RenderFrame.vue"
import { useFramesStore } from "./use-frames-store"

const store = useFramesStore()

const { pages } = defineProps({
    pages: {},
})

provide("inertia-frames-vue::pages", pages)
</script>

<template>
    <div>
        <template v-for="frame in store.frames" :key="frame.$$id">
            <div>
                <Component :is="frame.component" :frame="frame">
                    <div v-if="!frame.loaded">
                        <slot name="processing"></slot>
                    </div>

                    <Teleport :to="frame.target" :disabled="!frame.target">
                        <RenderFrame :frame="frame" v-if="frame.page" />
                    </Teleport>
                </Component>
            </div>
        </template>
    </div>
</template>

<style scoped></style>
