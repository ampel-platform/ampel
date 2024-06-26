import {vitePlugin as remix} from "@remix-run/dev";
import {defineConfig} from "vite";
import path from "path";

export default defineConfig({
    plugins: [remix({
        // routes(defineRoutes) {
        //     return defineRoutes((route) => {
        //         route("patients", "patients/layout.tsx", () => {
        //             route()
        //         })
        //     });
        // },
    })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./app")
        }
    }
});