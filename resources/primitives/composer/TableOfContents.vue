<script setup lang="ts">
import { Editor } from "@tiptap/vue-3"
import { onBeforeUnmount, onMounted, ref } from "vue"
import TableOfContentsItem from "./TableOfContentsItem.vue"

type Props = {
    editor: Editor
}

const { editor } = defineProps<Props>()

const headings = ref([])
const reads = ref([])

function pastTheMiddle(element) {
    const rect = element.getBoundingClientRect()
    const screenHeight = window.innerHeight || document.documentElement.clientHeight
    const middle = screenHeight / 2

    return rect.top <= middle
}

function handleScroll() {
    const headings = document.querySelectorAll("h2, h3, h4, h5, h6")

    headings.forEach((heading) => {
        if (pastTheMiddle(heading) && !reads.value.includes(heading.id)) {
            reads.value.push(heading.id)
        }

        if (!pastTheMiddle(heading) && reads.value.includes(heading.id)) {
            const index = reads.value.indexOf(heading.id)
            if (index !== -1) {
                reads.value.splice(index, 1)
            }
        }
    })
}

function registerScrollHandler() {
    window.addEventListener("scroll", handleScroll)
}

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll)
})

onMounted(() => {
    const transaction = editor.state.tr

    editor.state.doc.descendants((node, position) => {
        if (node.type.name !== "heading") {
            return
        }

        const slug = node.textContent
            .toLowerCase()
            .replace(/[^a-z0-9\s]/gi, "")
            .replaceAll(" ", "-")

        const id = `${headings.value.length + 1}--${slug}`

        if (node.attrs.id !== id) {
            transaction.setNodeMarkup(position, undefined, {
                ...node.attrs,
                id,
            })
        }

        headings.value.push({
            level: node.attrs.level,
            text: node.textContent,
            id,
        })
    })

    transaction.setMeta("addToHistory", false)
    transaction.setMeta("preventUpdate", false)

    editor.view.dispatch(transaction)

    registerScrollHandler()
})
</script>

<template>
    <div class="table-of-contents">
        <div class="[ mb-2.5 font-semibold ]">
            {{ $t("components.table-of-contents.title") }}
        </div>

        <TableOfContentsItem :active="false" href="#" v-if="headings.length === 0">
            <span>No headings on this page</span>
        </TableOfContentsItem>

        <TableOfContentsItem v-for="heading in headings" :key="heading.id" :href="`#${heading.id}`" :active="reads.includes(heading.id)" :level="heading.level">
            {{ heading.text }}
        </TableOfContentsItem>
    </div>
</template>

<style scoped></style>
