import {vitePlugin as remix} from "@remix-run/dev";
import {defineConfig} from "vite";
import path from "path";

export default defineConfig({
    plugins: [remix({
        routes(defineRoutes) {
            return defineRoutes((route) => {
                route("/", "routes/root-redirect.tsx");
                route("alerts/patients/:patient_id/cases/:case_id", "alerts/patient-alerts.tsx")
            });
        },
    })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./app")
        }
    }
});