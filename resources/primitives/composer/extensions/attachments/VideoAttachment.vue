<script setup lang="ts">
import { $assets } from "$app/store/page"

type Props = {
    filename: string
    filesize: number
    mimetype: string
    type: string
    path: string
}

const { path } = defineProps<Props>()

const url = `${$assets.value.cdn}/${path}`
</script>

<template>
    <div data-file class="attachment attachment--video">
        <video class="attachment__asset [ block rounded-md block w-full ]" controls>
            <source :src="url" :type="mimetype" />
        </video>
    </div>
</template>

<style scoped></style>
