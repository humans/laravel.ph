<script setup lang="ts">
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
    <div data-file class="attachment attachment--image [ my-12 ]">
        <div>
            <a>
                <img :src="url" :alt="filename" class="attachment__asset [ block rounded-md mx-auto max-w-[80%] ]" />
            </a>
        </div>

        <div class="attachment__details [ flex flex-wrap justify-center gap-4 text-xs text-muted mt-2.5 font-medium ]">
            <span class="asset__filename" :aria-label="`${$t('nouns.file_name')}: ${filename}`">{{ filename }}</span>

            <span class="asset__filesize" :aria-label="`${$t('nouns.file_size')}: ${bytesToSize(filesize)}`"> {{ bytesToSize(filesize) }}</span>

            <a :href="url" class="asset__download [ underline ]" target="_blank" rel="noopener">
                {{ $t("actions.download") }}
            </a>
        </div>
    </div>
</template>

<style scoped></style>
