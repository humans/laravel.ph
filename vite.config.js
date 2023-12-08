import vue from "@vitejs/plugin-vue"
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from "path"

export default defineConfig({
    build: {
        sourcemap: true,
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        dedupe: ["vue"],
        alias: {
            "@": path.resolve("resources"),
            "@primitives": path.resolve("resources/primitives"),
            "@composables": path.resolve("resources/composables"),
            "@icons": path.resolve("resources/icons"),
            "@utils": path.resolve("resources/utils"),
            $app: path.resolve("resources/[app]"),
            $outside: path.resolve("resources/[outside]"),
            $super: path.resolve("resources/[super]"),
        },
    },
});
