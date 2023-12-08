import axios from "axios"
import { ref, Ref } from "vue"

export const usePagination = (pagination: Ref<Pagination<any>>) => {
    const processing = ref(false)
    const error = ref<string | null>(null)
    const hasMultiplePages = !!(pagination.value.links.next || pagination.value.meta.total > 1 || pagination.value.meta.current_page > 1)
    const onLastPage = ref(pagination.value.links.next === null)

    async function next() {
        processing.value = true

        if (!pagination.value.links.next) {
            return
        }

        try {
            const { links, data, meta } = await axios.get(pagination.value.links.next).then((response) => response.data)

            pagination.value.links = links
            pagination.value.meta = meta
            pagination.value.data = pagination.value.data.concat(data)

            onLastPage.value = links.next === null
        } catch (e) {
            // @ts-ignore-next-line
            error.value = e
            console.error(e)
        } finally {
            processing.value = false
        }
    }

    return { next, processing, error, hasMultiplePages, onLastPage }
}
