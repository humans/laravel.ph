import { defineStore } from "pinia"
import { nextTick, ref } from "vue"

export const useFramesStore = defineStore("inertia-frames", () => {
    const frames = ref([])

    function open(options) {
        const frame = {
            $$id: Symbol(),
            transition: options?.transition || 0,
            active: false,
            loaded: false,
            page: null,
            properties: {},
            ...options,
        }

        frames.value.push(frame)

        nextTick(() => {
            frames.value = frames.value.map(($frame) => {
                if ($frame.$$id === frame.$$id) {
                    $frame.active = true
                }

                return $frame
            })
        })

        reload(frame)
    }

    function markAsLoaded(frame) {
        frames.value = frames.value.map(($frame) => {
            if ($frame.$$id === frame.$$id) {
                $frame.loaded = true
            }

            return $frame
        })
    }

    function reload(frame) {
        fetch(frame.url, {
            headers: { "X-Inertia-Frame": "Yes" },
        })
            .then((response) => response.json())
            .then((page) => {
                frames.value = frames.value.map(($frame) => {
                    if ($frame.$$id === frame.$$id) {
                        $frame.page = page
                    }

                    return $frame
                })
            })
    }

    function close(frame, data) {
        frames.value = frames.value.map(($frame) => {
            if ($frame.$$id === frame.$$id) {
                $frame.active = false
            }

            return $frame
        })

        if (frame.onClose) {
            frame.onClose({ frame, data })
        }

        setTimeout(() => {
            frames.value = frames.value.filter(($frame) => $frame.$$id !== frame.$$id)
        }, frame.transition * 1.2)
    }

    return { frames, open, close, reload, markAsLoaded }
})
