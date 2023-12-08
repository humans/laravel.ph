<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "radix-vue"
import { className } from "@/utils"

type Props = {
    title: string
    side?: "right" | "left" | "top" | "bottom"
    offset?: number
}

withDefaults(defineProps<Props>(), {
    side: "top",
    offset: 8,
})
</script>

<template>
    <TooltipProvider :delay-duration="100">
        <TooltipRoot>
            <TooltipTrigger as="span">
                <slot></slot>
            </TooltipTrigger>
            <TooltipPortal to="#layers">
                <TooltipContent
                    :side="side"
                    :side-offset="offset"
                    :class="
                        className(
                            `[ data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade ]`,
                            `[ will-change-[transform,opacity] ]`,
                            `[ z-[80] bg-black text-white text-xs font-medium px-4 py-2.5 rounded-md select-none leading-none ]`
                        )
                    "
                >
                    <div>
                        {{ title }}
                    </div>
                    <TooltipArrow class="[ fill-black ]"></TooltipArrow>
                </TooltipContent>
            </TooltipPortal>
        </TooltipRoot>
    </TooltipProvider>
</template>

<style scoped></style>
