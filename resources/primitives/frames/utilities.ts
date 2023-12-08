import type { Component } from "vue"
import { Dialog } from "@primitives/dialog"
import { Block, Popover } from "@primitives/frames"
import { useFramesStore } from "./use-frames-store"

type OpenFrameProps = {
    url: string
    [key: string]: any
}

function open(frame: OpenFrameProps) {
    const store = useFramesStore()

    const openFrame = store.frames.find(($frame) => $frame.url === frame.url)

    if (openFrame) {
        closeFrame(openFrame)
    } else {
        store.open(frame)
    }
}

export function reloadFrame(frame?: InertiaFrame) {
    if (!frame) {
        return
    }

    useFramesStore().reload(frame)
}

export function closeFrame(frame?: InertiaFrame, data?: any) {
    if (!frame) {
        return
    }

    const store = useFramesStore()

    const openFrame = store.frames.find(($frame) => $frame.url === frame.url)

    if (!openFrame.active) {
        return
    }

    store.close(
        {
            transition: transitionDuration(frame.component),
            ...frame,
        },
        data
    )
}

export function openFrame(frame: OpenFrameProps) {
    open({
        transition: transitionDuration(frame.component),
        ...frame,
    })
}

export function openDialog(frame: OpenFrameProps) {
    open({
        component: Dialog,
        transition: transitionDuration(Dialog),
        ...frame,
    })
}

export function openBlock(frame: OpenFrameProps) {
    open({
        component: Block,
        ...frame,
    })
}

export function openPopover(frame: OpenFrameProps) {
    open({
        component: Popover,
        transition: transitionDuration(Popover),
        ...frame,
    })
}

export function transitionDuration(component: Component): number {
    // @ts-ignore
    if (component.__name === "Dialog") {
        return 300
    }

    // @ts-ignore
    if (component.__name === "Popover") {
        return 300
    }

    return 0
}
