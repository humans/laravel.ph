<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline"
import { DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemEmits, type DropdownMenuCheckboxItemProps, DropdownMenuItemIndicator, useEmitAsProps } from "radix-vue"
import { className } from "@utils"

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: string }>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()
</script>

<template>
    <DropdownMenuCheckboxItem
        v-bind="{ ...props, ...useEmitAsProps(emits) }"
        :class="
            className(
                '[ relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ]',
                props.class
            )
        "
    >
        <span class="[ absolute left-2 flex h-3.5 w-3.5 items-center justify-center ]">
            <DropdownMenuItemIndicator>
                <CheckIcon class="[ w-4 h-4 ]" />
            </DropdownMenuItemIndicator>
        </span>
        <slot />
    </DropdownMenuCheckboxItem>
</template>
