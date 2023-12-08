const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

const colors = {
    accent: {
        base: "rgb(var(--color-accent-base) / <alpha-value>)",
        canvas: "rgb(var(--color-accent-canvas) / <alpha-value>)",
        stroke: "rgb(var(--color-accent-stroke) / <alpha-value>)",
        ring: "rgb(var(--color-accent-ring) / <alpha-value>)",
    },
    canvas: "rgb(var(--color-canvas) / <alpha-value>)",
    stroke: "rgb(var(--color-stroke) / <alpha-value>)",
    muted: "rgb(var(--color-muted) / <alpha-value>)",
    danger: {
        canvas: "rgb(var(--color-danger-canvas) / <alpha-value>)",
        stroke: "rgb(var(--color-danger-stroke) / <alpha-value>)",
    },
    placeholder: "rgb(var(--color-placeholder) / <alpha-value>)",
    neutral: {
        50: "rgb(var(--color-neutral-50) / <alpha-value>)",
        100: "rgb(var(--color-neutral-100) / <alpha-value>)",
        200: "rgb(var(--color-neutral-200) / <alpha-value>)",
        300: "rgb(var(--color-neutral-300) / <alpha-value>)",
        400: "rgb(var(--color-neutral-400) / <alpha-value>)",
        500: "rgb(var(--color-neutral-500) / <alpha-value>)",
        600: "rgb(var(--color-neutral-600) / <alpha-value>)",
        700: "rgb(var(--color-neutral-700) / <alpha-value>)",
        800: "rgb(var(--color-neutral-800) / <alpha-value>)",
        900: "rgb(var(--color-neutral-900) / <alpha-value>)",
        950: "rgb(var(--color-neutral-950) / <alpha-value>)",
    },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resources/**/*.vue", "./resources/**/*.ts", "./resources/**/*.blade.php"],
    theme: {
        extend: {
            transitionTimingFunction: {
                bounce: "cubic-bezier(.47,1.64,.41,.8)",
            },
            keyframes: {
                slideDownAndFade: {
                    from: { opacity: 0, transform: "translateY(-2px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                slideLeftAndFade: {
                    from: { opacity: 0, transform: "translateX(2px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                },
                slideUpAndFade: {
                    from: { opacity: 0, transform: "translateY(2px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                slideRightAndFade: {
                    from: { opacity: 0, transform: "translateX(-2px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                },
            },
            animation: {
                slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            },
            colors,
            fontFamily: {
                sans: [...defaultTheme.fontFamily.sans],
                mono: [ ...defaultTheme.fontFamily.mono],
                serif: [ ...defaultTheme.fontFamily.serif],
            },
            fontSize: {
                "2xs": "0.6875rem",
            },
            letterSpacing: {
                normal: "-0.010em",
                tight: "-0.022em",
                tighter: "-0.038em",
                tightest: "-0.05em",
            },
            lineHeight: {
                normal: "1.545",
                prose: "1.747",
            },
            spacing: {
                18: '4.5rem',
            },
            height: {
                4.5: "1.125rem",
                7.5: "1.875rem",
            },
            width: {
                4.5: "1.125rem",
                7.5: "1.875rem",
            },
            borderColor: colors,
            backgroundOpacity: {
                8: "0.08",
            },
            fontWeight: {
                normal: 450,
                medium: 550,
            },
            zIndex: {
                wallpaper: 0,
                content: 10,
                header: 20,
                footer: 20,
                overlay: 30,
                dropdown: 40,
                navigation: 50,
                tooltip: 60,
                modal: 70,
                dialog: 70,
                notification: 70,
                autocomplete: 80,
            },
        },
    },
    plugins: [
        require("@tailwindcss/container-queries"),
        require("@tailwindcss/forms")(),
        function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
                },
                { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
            )
        },
        plugin(function ({ addVariant }) {
            addVariant("no-js", ".no-js &")

            addVariant("hocus", ["&:hover", "&:focus"])

            addVariant("checked", "&:has(:checked)")

            addVariant("focus-visible-within", "&:has(:focus-visible)")
        }),
    ],
}
