import { cva } from "class-variance-authority"

export { default as Field } from "./Field.vue"
export { default as FieldMessage } from "./FieldMessage.vue"

export const FieldMessageVariants = cva(`field-message [ text-sm ]`, {
    variants: {
        look: {
            hint: "field-message--hint [ text-muted ]",
            error: "field-message--error [ text-danger-stroke font-medium ]",
        },
    },
})
