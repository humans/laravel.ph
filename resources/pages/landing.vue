<script setup lang="ts">
import { Button } from "@primitives/button"
import { ContentContainer } from "@primitives/content-container"

type Props = {}

defineProps<Props>()
</script>

<template>
    <div>
        <ContentContainer>
            Hello
            <Button>This is a button</Button>
        </ContentContainer>
    </div>
</template>

<style scoped></style>
