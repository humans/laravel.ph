<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps } from "radix-vue"
import { className } from "@utils"

type Props = DropdownMenuItemProps & {
    inset?: boolean
    class?: string
    look?: "base" | "destructive"
}

const props = withDefaults(defineProps<Props>(), {
    look: "base",
})
</script>

<template>
    <DropdownMenuItem
        v-bind="props"
        :class="[
            className(
                'dropdown-item',
                '[ text-sm leading-none text-muted rounded-md flex items-center relative py-2.5 px-3 select-none ]',
                '[ hocus:ring-0 hocus:outline-none hover:text-stroke data-[highlighted]:bg-neutral-100/30  data-[disabled]:text-neutral-400 ]',
                inset && 'dropdown-item--inset [ ps-8 ]',
                look === 'destructive' && 'dropdown-item--destructive [ text-danger-stroke hocus:text-danger-stroke ]',
                props.class
            ),
        ]"
    >
        <slot />
    </DropdownMenuItem>
</template>
