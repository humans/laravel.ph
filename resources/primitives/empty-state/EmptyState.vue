<script setup lang="ts">
type Props = {
    image: string
}

defineProps<Props>()
</script>

<template>
    <div class="empty-state [ max-w-lg mx-auto w-full ]">
        <div class="[ flex justify-center ]">
            <img :src="image" alt="" class="empty-state__image [ max-w-[150px] w-full ]" loading="lazy" decoding="async" />
        </div>

        <div class="[ mt-6 ]">
            <p class="[ font-bold tracking-tight font-serif text-2xl ]"><slot name="heading"></slot></p>

            <div class="[ text-muted mt-1.5 leading-prose ]">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<style>
@media (prefers-color-scheme: dark) {
    .theme--device .empty-state__image {
        @apply invert;
    }
}

.theme--dark .empty-state__image {
    @apply invert;
}
</style>
