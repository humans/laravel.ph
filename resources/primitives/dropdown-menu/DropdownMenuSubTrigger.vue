<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline"
import { DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps } from "radix-vue"
import { className } from "@utils"

const props = defineProps<DropdownMenuSubTriggerProps & { class?: string }>()
</script>

<template>
    <DropdownMenuSubTrigger
        v-bind="props"
        :class="
            className(
                'dropdown-item',
                '[ text-sm leading-none text-muted rounded-md flex items-center relative py-2.5 px-3 select-none ]',
                '[ hocus:ring-0 hocus:outline-none hover:text-stroke data-[highlighted]:bg-neutral-100/30  data-[disabled]:text-neutral-400 ]',
                props.class
            )
        "
    >
        <slot />

        <div class="ms-auto ps-[20px] text-mauve11 group-data-[highlighted]:text-white">
            <ChevronRightIcon class="[ h-4 w-4 rtl:rotate-180 ]" />
        </div>
    </DropdownMenuSubTrigger>
</template>
