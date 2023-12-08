export function toVirtualElement(clientRectFn: () => DOMRect) {
    const clientRect = clientRectFn()

    return {
        getBoundingClientRect() {
            return {
                top: clientRect.top,
                right: clientRect.right,
                bottom: clientRect.bottom,
                left: clientRect.left,
                width: clientRect.width,
                height: clientRect.height,
                x: clientRect.x,
                y: clientRect.y,
            }
        },
    }
}
