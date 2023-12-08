<script setup lang="ts">
type FrameContainerSize = "dialog" | "prose" | "task"

defineOptions({
    inheritAttrs: false,
})

type Props = {
    size?: FrameContainerSize
    frame: any
}

withDefaults(defineProps<Props>(), {
    size: "dialog",
})

const SizeOptions = {
    dialog: "[ max-w-xl ]",
    prose: "[ max-w-[54rem] ]",
    task: "[ max-w-[46.875rem] ]",
}
</script>

<template>
    <div class="frame-container [ mx-auto ]" :class="[frame ? '' : `${SizeOptions[size]} ${$attrs.class ?? ''}`]">
        <slot></slot>
    </div>
</template>

<style scoped></style>
