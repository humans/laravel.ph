<script setup lang="ts">
import { DocumentIcon } from "@heroicons/vue/24/outline"
import { bytesToSize } from "@utils/file-size"
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
    <a :href="url" data-file class="attachment attachment--file [ block rounded-md ]" target="_blank">
        <div class="[ px-5 py-3 flex border rounded-md gap-3 ]">
            <DocumentIcon class="attachment__icon [ h-6 w-6 text-stroke/50 stroke-1 mt-1 ]" />

            <div>
                <div class="asset__filename [ font-medium tracking-tight ]" :aria-label="`${$t('nouns.file_name')}: ${filename}`">{{ filename }}</div>

                <div class="asset__filesize [ text-sm text-muted ]" :aria-label="`${$t('nouns.file_size')}: ${bytesToSize(filesize)}`">{{ bytesToSize(filesize) }}</div>
            </div>
        </div>
    </a>
</template>

<style scoped></style>
