<script setup lang="ts">
import { AvatarVariants } from "."
import { AvatarImage, AvatarRoot } from "radix-vue"
import { computed, toRefs } from "vue"
import { className } from "@utils"

type Props = {
    size?: NonNullable<Parameters<typeof AvatarVariants>[0]>["size"]
    user: App.User
    height?: number
    width?: number
}

const props = withDefaults(defineProps<Props>(), {
    height: undefined,
    width: undefined,
})

const { height, width } = props

const { user, size } = toRefs(props)

const ImageDimensions = {
    custom: undefined,
    select: 24,
    mention: 24,
    tiny: 30,
    small: 42,
    medium: 72,
    large: 96,
}

const value = ImageDimensions[size.value]

const transformation = `tr=w-${width ?? value},h-${height ?? value},f-auto`

const shouldApplyTransformation = !user.value.photo.includes("ui-avatars")

const image = computed(() => `${user.value.photo}?${shouldApplyTransformation ? transformation : ""}`)
</script>

<template>
    <AvatarRoot :class="className(AvatarVariants({ size }))">
        <AvatarImage :src="image" class="[ h-full w-full object-cover object-center ]" :height="value" :width="value" :alt="user.display_name" />
    </AvatarRoot>
</template>

<style scoped></style>
