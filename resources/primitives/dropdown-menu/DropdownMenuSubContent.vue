<script setup lang="ts">
import { DropdownMenuSubContent, type DropdownMenuSubContentEmits, type DropdownMenuSubContentProps, useForwardPropsEmits } from "radix-vue"
import { className } from "@utils"

const props = defineProps<DropdownMenuSubContentProps>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <DropdownMenuSubContent
        v-bind="forwarded"
        :class="
            className(
                '[ bg-canvas z-50 min-w-[20rem] outline-none rounded-lg p-2 ]',
                '[ will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade ]',
                '[ shadow-2xl shadow-black/20 ]',
                '[ border border-stroke/5 ]',
                $attrs.class ?? ''
            )
        "
    >
        <slot />
    </DropdownMenuSubContent>
</template>
