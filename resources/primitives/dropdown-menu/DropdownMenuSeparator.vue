<script setup lang="ts">
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from "radix-vue"

const props = defineProps<DropdownMenuSeparatorProps>()
</script>

<template>
    <DropdownMenuSeparator v-bind="props" class="dropdown-separator [ h-px bg-neutral-100 mx-2 my-2 ]" />
</template>
