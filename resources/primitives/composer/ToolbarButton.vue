<script setup lang="ts">
import type { Component } from "vue"
import { computed, ref, toRefs } from "vue"
import { Tooltip } from "@primitives/tooltip"

type Command = {
    icon: Component
    id: string
    name: string
    alt: string
    class: string
    active: () => void
    action: () => void
    options?: Command[]
    hotkeys: {
        apple: string
        windows: string
    }
}

type Props = {
    command: Command
}

const props = defineProps<Props>()

const { command } = toRefs(props)

const open = ref(false)

function handleClick() {
    command.value.action(open)
}

function handleOptionClick(command) {
    command.action()

    open.value = false
}

const active = computed(() => command.value.active(open))
</script>

<template>
    <div class="[ relative ]">
        <Tooltip :title="command.name">
            <button
                type="button"
                @click.prevent="handleClick"
                :key="command.id"
                class="[ transition duration-100 px-3.5 py-3 flex items-center justify-center hover:bg-neutral-100 ]"
                :class="{
                    '[ text-muted hover:text-stroke ]': !active,
                    '[ text-accent-base ]': active,
                }"
                tabindex="-1"
            >
                <Component :is="command.icon" class="[ h-[0.875rem] w-[0.875rem] ]" />
                <span class="[ sr-only ]">{{ command.alt }}</span>
            </button>
        </Tooltip>

        <div v-if="command.options">
            <div v-if="open" class="[ absolute bg-canvas top-full flex border border-neutral-200 rounded-sm z-10 ]">
                <div v-for="option in command.options" :key="option.id">
                    <Tooltip :title="option.name">
                        <button
                            type="button"
                            @click.prevent="handleOptionClick(option)"
                            :key="option.id"
                            class="[ transition duration-100 flex items-center justify-center hover:bg-neutral-100 ]"
                            :class="[
                                option.class,
                                {
                                    '[ bg-neutral-200 ]': option.active(),
                                },
                            ]"
                            tabindex="-1"
                        >
                            <Component :is="option.icon" class="[ h-4 w-4 ]" />
                            <span class="[ sr-only ]">{{ option.alt }}</span>
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
