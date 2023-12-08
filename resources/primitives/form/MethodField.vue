<script setup lang="ts">
type Method = "PUT" | "PATCH" | "DELETE"

type Props = {
    value: Method
}

defineProps<Props>()
</script>

<template>
    <input type="hidden" name="_method" :value="value" />
</template>

<style scoped></style>
