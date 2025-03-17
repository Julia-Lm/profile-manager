import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
    base: "/",
    plugins: [react(), svgr(), url(), nodePolyfills()],
    resolve: {
        alias: {
            src: "/src",
            app: "/src/app",
            pages: "/src/pages",
            shared: "/src/shared",
            entities: "/src/entities",
            features: "/src/features",
            widgets: "/src/widgets",
        },
    },
    define: {
        'process.env': {},
    },
    optimizeDeps: {
        include: ['crypto-browserify']
    },
    build: {
        rollupOptions: {
            external: ['crypto']
        }
    }
});
