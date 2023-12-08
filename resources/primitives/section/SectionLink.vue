<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline"
import { navigate } from "@utils"
import { Link } from "@primitives/link"
</script>

<template>
    <Link as="a" class="section-link [ text-sm inline-flex items-center gap-2 ]" @click="navigate" look="muted">
        <span>
            <slot></slot>
        </span>

        <ChevronRightIcon class="[ h-4 w-4 rtl:rotate-180 ]" />
    </Link>
</template>

<style scoped></style>
