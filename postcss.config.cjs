const postcss = require("postcss")

module.exports = {
    plugins: [
        {
            postcssPlugin: "grouped",
            Once(root, { result }) {
                return postcss([require("postcss-import"), require("postcss-mixins")]).process(root, result.opts)
            },
        },
        require("tailwindcss/nesting"),
        require("tailwindcss")("./tailwind.config.cjs"),
        require("autoprefixer"),
    ],
}
