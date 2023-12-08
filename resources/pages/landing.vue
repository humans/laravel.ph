<script setup lang="ts">
import { Button } from "@primitives/button"
import { ContentContainer } from "@primitives/content-container"

type Props = {}

defineProps<Props>()
</script>

<template>
    <div>
        <section class="[ py-24 ]">
            <ContentContainer>
                <div class="[ max-w-3xl mx-auto ]">
                    <h1 class="[ text-4xl md:text-5xl xl:text-6xl text-center font-bold tracking-tighter text-pretty ]">The Laravel community group in the Philippines</h1>

                    <p class="[ text-xl text-muted tracking-tight text-center mt-4 ]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet animi, distinctio eligendi, et facilis illum in iure libero maiores necessitatibus nulla.
                    </p>
                </div>

                <div class="[ flex items-center justify-center gap-4 mt-12 ]">
                    <Button look="outline" size="large">Learn more</Button>
                    <Button look="primary" size="large">Join our Discord server</Button>
                </div>
            </ContentContainer>
        </section>
    </div>
</template>

<style scoped></style>
