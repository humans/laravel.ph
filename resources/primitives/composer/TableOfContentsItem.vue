<script setup lang="ts">
type Props = {
    level?: number
    active: boolean
}

withDefaults(defineProps<Props>(), {
    level: 1,
})
</script>

<template>
    <a
        :class="[
            'table-of-contents-item [ py-1.5 flex transition duration-100 focus:ring-0 hover:text-stroke w-fit ]',
            `table-of-contents-item--${level}`,
            {
                'table-of-contents-item--idle [ text-neutral-500 ]': !active,
                'table-of-contents-item--active [ text-stroke ]': active,
            },
        ]"
    >
        <slot></slot>
    </a>
</template>

<style>
.table-of-contents-item--2 {
    @apply font-medium;
}

.table-of-contents-item--3 {
    @apply ps-4;
}

.table-of-contents-item--4 {
    @apply ps-6;
}
</style>
