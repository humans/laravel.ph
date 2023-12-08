import { mount } from "@vue/test-utils"
import { it, test, describe, expect } from "vitest"
import Button from "./Button.vue"

describe("look", () => {
    it("defaults to `neutral` when no parameter is passed", () => {
        const wrapper = mount(Button, {})

        expect(wrapper.html()).toContain("button--neutral")
    })

    test("primary", () => {
        const wrapper = mount(Button, { props: { look: "primary" } })

        expect(wrapper.html()).toContain("button--primary")
    })

    test("neutral", () => {
        const wrapper = mount(Button, { props: { look: "neutral" } })

        expect(wrapper.html()).toContain("button--neutral")
    })

    test("outline", () => {
        const wrapper = mount(Button, { props: { look: "outline" } })

        expect(wrapper.html()).toContain("button--outline")
    })

    test("danger", () => {
        const wrapper = mount(Button, { props: { look: "danger" } })

        expect(wrapper.html()).toContain("button--danger")
    })

    test("clear", () => {
        const wrapper = mount(Button, { props: { look: "clear" } })

        expect(wrapper.html()).toContain("button--clear")
    })

    test("custom", () => {
        const wrapper = mount(Button, { props: { look: "custom" } })

        expect(wrapper.html()).toContain("button--custom-look")
    })
})

describe("size", () => {
    it("defaults to `medium` when no parameter is passed", () => {
        const wrapper = mount(Button, {})

        expect(wrapper.html()).toContain("button--medium")
    })

    test("tiny", () => {
        const wrapper = mount(Button, { props: { size: "tiny" } })

        expect(wrapper.html()).toContain("button--tiny")
    })

    test("small", () => {
        const wrapper = mount(Button, { props: { size: "small" } })

        expect(wrapper.html()).toContain("button--small")
    })

    test("medium", () => {
        const wrapper = mount(Button, { props: { size: "medium" } })

        expect(wrapper.html()).toContain("button--medium")
    })

    test("custom", () => {
        const wrapper = mount(Button, { props: { size: "custom" } })

        expect(wrapper.html()).toContain("button--custom-size")
    })
})

test("disabled", () => {
    const wrapper = mount(Button, {
        props: {
            disabled: true,
        },
    })

    expect(wrapper.html()).toContain("button--disabled")
})
