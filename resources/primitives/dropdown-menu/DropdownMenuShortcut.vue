<script setup lang="ts">
import { className } from "@utils"
</script>

<template>
    <span :class="className('ml-auto text-xs tracking-widest opacity-60', $attrs.class ?? '')">
        <slot />
    </span>
</template>
