<script setup lang="ts">
import { DropdownMenuContent, type DropdownMenuContentEmits, type DropdownMenuContentProps, DropdownMenuPortal, useForwardPropsEmits } from "radix-vue"
import { className } from "@utils"

const props = withDefaults(defineProps<DropdownMenuContentProps & { class?: string }>(), {
    sideOffset: 4,
})
const emits = defineEmits<DropdownMenuContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <DropdownMenuPortal>
        <DropdownMenuContent
            :class="[
                className(
                    '[ bg-canvas z-50 min-w-[20rem] outline-none rounded-lg p-2 ]',
                    '[ will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade ]',
                    '[ shadow-2xl shadow-black/20 ]',
                    '[ border border-stroke/5 ]',
                    props.class
                ),
            ]"
            v-bind="forwarded"
        >
            <slot />
        </DropdownMenuContent>
    </DropdownMenuPortal>
</template>
