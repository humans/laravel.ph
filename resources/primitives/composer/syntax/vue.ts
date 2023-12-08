/**
 * Copied from highlightjs-vue: https://github.com/highlightjs/highlightjs-vue
 *
 * Author: Sara Lissette Luis Ibáñez <lissette.ibnz@gmail.com>
 * License: BSD-3-Clause
 */

export function vue(hljs) {
    return {
        subLanguage: "xml",
        contains: [
            hljs.COMMENT("<!--", "-->", {
                relevance: 10,
            }),
            {
                begin: /^(\s*)(<script(\ssetup)?>)/gm,
                end: /^(\s*)(<\/script>)/gm,
                subLanguage: "javascript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /@((click|keyup|keydown|mouse(over|leave|enter)|focus(in|out))(\..+)?)="/gm,
                end: /"/gm,
                subLanguage: "javascript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /(ref)="/gm,
                end: /"/gm,
                subLanguage: "javascript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /:(is|class|disabled|aria-disabled)="/gm,
                end: /"/gm,
                subLanguage: "javascript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /v-(if|for|html|else-if)="/gm,
                end: /"/gm,
                subLanguage: "javascript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /\{\{/gm,
                end: /\}\}/gm,
                subLanguage: "javascript",
                contains: [
                    {
                        begin: /[\{\{]/,
                        end: /[\}\}]/,
                        skip: true,
                    },
                ],
            },
            {
                begin: /^(\s*)(<script(\ssetup\s)?(lang=["']ts["'])>)/gm,
                end: /^(\s*)(<\/script>)/gm,
                subLanguage: "typescript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /^(\s*)(<style.*>)/gm,
                end: /^(\s*)(<\/style>)/gm,
                subLanguage: "css",
                excludeBegin: true,
                excludeEnd: true,
            },
        ],
    }
}
