<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, type DropdownMenuRadioItemEmits, type DropdownMenuRadioItemProps, useEmitAsProps } from "radix-vue"
import { className } from "@utils"

const props = defineProps<DropdownMenuRadioItemProps & { class?: string }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()
</script>

<template>
    <DropdownMenuRadioItem
        v-bind="{ ...props, ...useEmitAsProps(emits) }"
        :class="
            className(
                'dropdown-item',
                '[ text-sm leading-none text-muted rounded-md flex items-center relative py-2.5 px-3 select-none ]',
                '[ hocus:ring-0 hocus:outline-none hover:text-stroke data-[highlighted]:bg-neutral-100/30  data-[disabled]:text-neutral-400 ]',
                'dropdown-item--inset [ ps-8 ]',
                props.class
            )
        "
    >
        <span class="[ absolute start-1.5 w-6 inline-flex items-center justify-center ]">
            <DropdownMenuItemIndicator>
                <icon icon="radix-icons:dot-filled" />
            </DropdownMenuItemIndicator>
        </span>

        <slot />
    </DropdownMenuRadioItem>
</template>
