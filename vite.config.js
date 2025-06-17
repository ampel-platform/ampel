import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    logLevel: 'debug',
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
    },
    server: {
        timeout: 30000, // 30 seconds
    },
    // The CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
    // future: {
    //     v3_fetcherPersist: true,
    //     v3_lazyRouteDiscovery: true,
    //     v3_relativeSplatPath: true,
    //     v3_singleFetch: true,
    //     v3_throwAbortReason: true,
    // }
    //     ⚠️ React Router v7 – mehrere Verhaltensänderungen

    // React Router 7 steht vor der Tür und Remix 2.13 erlaubt dir, mit "future flags" schon jetzt neue Verhaltensweisen zu aktivieren. Diese Flags betreffen:

    //     v3_fetcherPersist – Fetcher-Status wird über Navigationsereignisse hinweg erhalten

    //     v3_lazyRouteDiscovery – Routenmanifest wird anders erstellt

    //     v3_relativeSplatPath – Splat (*) Verhalten wird präziser

    //     v3_singleFetch – Einheitlicher Fetch-Zyklus für Daten

    //     v3_throwAbortReason – Abort-Fehler liefern strukturiertere Fehlerobjekte

    // ✅ Was tun?

    //     Setze Flags gezielt im Remix future-Konfigurationsblock, z. B.:

    // export default defineConfig({
    //   future: {
    //     v3_fetcherPersist: true,
    //     v3_lazyRouteDiscovery: true,
    //     v3_relativeSplatPath: true,
    //     v3_singleFetch: true,
    //     v3_throwAbortReason: true,
    //   }
    // })

    //     Wenn du jetzt schon auf Remix 2.13 bist, kannst du damit sukzessive gegen die kommenden Änderungen testen.
});