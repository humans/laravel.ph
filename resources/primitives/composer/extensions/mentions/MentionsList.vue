<script setup lang="ts">
import { computePosition, offset } from "@floating-ui/dom"
import { SuggestionKeyDownProps } from "@tiptap/suggestion"
import { computed, onMounted, ref, toRefs } from "vue"
import MentionOption from "./MentionOption.vue"
import { toVirtualElement } from "./to-virtual-element"

type Props = {
    clientRect: any
    items: App.User[]
    command: Function
    query: string
}

const props = defineProps<Props>()

const { items, command } = toRefs(props)

const $root = ref(null)
const $virtualElement = computed(() => toVirtualElement(props.clientRect))
const cursor = ref(0)

function updatePosition() {
    computePosition($virtualElement.value, $root.value!, {
        middleware: [offset({ mainAxis: 16 })],
        placement: "bottom-start",
    }).then(({ x, y }) => {
        Object.assign($root.value!.style, {
            left: `${x}px`,
            top: `${y}px`,
        })
    })
}

onMounted(() => {
    updatePosition()
})

function select(item) {
    command.value({ id: item.id })
}

function onKeyDown({ event }: SuggestionKeyDownProps) {
    if (event.key === "ArrowUp") {
        handleUp()
        return true
    }

    if (event.key === "ArrowDown") {
        handleDown()
        return true
    }

    if (event.key === "Enter") {
        handleEnter()
        return true
    }

    return false
}

function handleUp() {
    cursor.value = (cursor.value + items.value.length - 1) % items.value.length
}

function handleDown() {
    cursor.value = (cursor.value + 1) % items.value.length
}

function handleEnter() {
    select(items.value[cursor.value])
}

defineExpose({
    onKeyDown,
})
</script>

<template>
    <div class="dropdown__content [ absolute top-0 start-0 z-autocomplete ]" ref="$root">
        <MentionOption v-for="(user, index) in items" @mouseenter="() => (cursor = index)" @select="() => select(user)" :key="user.id" :has-focus="cursor === index" :user="user" />

        <div v-if="items.length === 0">
            {{ $t("components.mentions-list.empty", { query }) }}
        </div>
    </div>
</template>

<style scoped></style>
