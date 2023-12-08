<script setup lang="ts">
import { Label, type LabelProps } from "radix-vue"
import { useAttrs } from "vue"
import { className } from "@utils"

const { class: classes, ...attrs } = useAttrs()

const props = defineProps<LabelProps>()
</script>

<template>
    <Label
        v-bind="{
            ...props,
            attrs,
        }"
        :class="className(`label [ block text-sm tracking-tight font-medium text-start ]`, classes ?? '')"
    >
        <slot />
    </Label>
</template>
