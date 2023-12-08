import { cva } from "class-variance-authority"

export { default as ContentContainer } from "./ContentContainer.vue"

const WrapOptions = {
    none: "wrap--none",
    small: "wrap--small [ max-w-xl ]",
    dialog: "wrap--dialog [ max-w-xl ]",
    medium: "wrap--medium [ max-w-5xl ]",
    default: "wrap--default [ max-w-[88rem] ]",
    large: "wrap--default [ max-w-[100rem] ]",
    max: "wrap--max [ max-w-[120rem] ]",
    task: "wrap--task [ max-w-[46.875rem] ]",
    prose: "wrap--prose [ max-w-[54rem] ]",
    combobox: "wrap--combobox [ max-w-[350px] ]",
}

const PaddingOptions = {
    none: "padding--none",
    viewport: "padding--default [ px-[8vw] md:px-[6vw] lg:px-[4vw] 2xl:px-12 ]",
}

export const ContentContainerVariants = cva(`content-container [ mx-auto ]`, {
    variants: {
        wrap: WrapOptions,
        padding: PaddingOptions,
    },
    defaultVariants: {
        wrap: "default",
        padding: "viewport",
    },
})
