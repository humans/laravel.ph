<script setup lang="ts">
type Resolver = "ddg" | "statvoo" | "google"

type Props = {
    url: string
    resolver?: Resolver
}

const Resolvers = {
    ddg: "https://icons.duckduckgo.com/ip3/{domain}.ico",
    statvoo: "https://api.statvoo.com/favicon/?url={domain}",
    google: "http://www.google.com/s2/favicons?domain={domain}",
}

const { resolver, url } = withDefaults(defineProps<Props>(), {
    resolver: "ddg",
})

const domain = new URL(url).host
const favicon = Resolvers[resolver].replace("{domain}", domain)
</script>

<template>
    <img :src="favicon" :alt="$t('components.favicon.alt', { domain })" />
</template>

<style scoped></style>
