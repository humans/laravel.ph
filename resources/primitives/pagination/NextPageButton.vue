<script setup lang="ts">
import { toRefs } from "vue"
import { Button } from "@primitives/button"
import { IntersectionObserver } from "@primitives/intersection-observer"
import { Spinner } from "@primitives/spinner"
import { usePagination } from "./use-pagination"

type Props = {
    pagination: Pagination<any>
}

const props = defineProps<Props>()

const emit = defineEmits(["next"])

const { pagination } = toRefs(props)

const { error, processing, next, onLastPage, hasMultiplePages } = usePagination(pagination)

function handleIntersect() {
    next()
    emit("next")
}
</script>

<template>
    <IntersectionObserver @intersect="handleIntersect">
        <Button :disabled="processing" look="neutral" as="a" :href="pagination.links.next" @click.prevent="next" v-if="hasMultiplePages && !onLastPage">
            <span v-if="processing" class="[ inline-flex items-center gap-2 ]">
                <Spinner class="[ h-4 w-4 me-2 ]" />

                <slot name="processing"></slot>
            </span>

            <span v-else>
                <slot name="load-more"></slot>
            </span>
        </Button>

        <template v-if="!processing">
            <div v-if="!hasMultiplePages">
                <slot name="empty"></slot>
            </div>

            <div v-if="error">
                <slot name="error"></slot>
            </div>

            <div v-if="(pagination.meta.current_page > 1 && onLastPage) || (pagination.meta.current_page === 1 && pagination.meta.total > 0)" class="[ text-muted text-sm ]">
                <slot name="last-page"></slot>
            </div>
        </template>
    </IntersectionObserver>
</template>

<style scoped></style>
