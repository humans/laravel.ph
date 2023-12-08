import { cva } from "class-variance-authority"

export { default as Avatar } from "./Avatar.vue"

export const AvatarVariants = cva(`avatar [ align-middle select-none inline-block overflow-hidden rounded-full ]`, {
    variants: {
        size: {
            custom: "avatar--custom",
            select: "avatar--select [ h-4 w-4 ]",
            mention: "avatar--mention [ h-4 w-4 ]",
            tiny: "avatar--tiny [ h-5 w-5 ]",
            small: "avatar--small [ h-7 w-7 ]",
            medium: "avatar--medium [ h-12 w-12 ]",
            large: "avatar--large [ h-16 w-16 ]",
        },
    },
    defaultVariants: {
        size: "medium",
    },
})
