import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"
export { default as FrameButton } from "./FrameButton.vue"
export { default as SubmitButton } from "./SubmitButton.vue"

const LookOptions = {
    primary: "button--primary [ bg-stroke text-canvas ]",
    neutral: "button--neutral [ text-muted ]",
    outline: "button--outline [ bg-canvas border border-stroke/5 ]",
    danger: "button--danger [ bg-danger-canvas/40 text-danger-stroke transition duration-200 hover:bg-danger-canvas/80 ]",
    clear: "button--clear [ bg-transparent hocus:bg-neutral-100 ]",
    custom: "button--custom-look",
}

const SizeOptions = {
    tiny: "button--tiny [ px-2 py-1 rounded text-xs font-medium ]",
    small: "button--small [ px-3 py-1.5 rounded text-sm font-medium tracking-tight ]",
    medium: "button--medium [ px-4 py-2 rounded text-sm font-medium tracking-tight ]",
    custom: "button--custom-size",
}

export const ButtonVariants = cva(
    `button [ inline-flex items-center transition duration-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:ring-stroke ]`,
    {
        variants: {
            look: LookOptions,
            size: SizeOptions,
        },
        defaultVariants: {
            look: "neutral",
            size: "medium",
        },
    }
)
