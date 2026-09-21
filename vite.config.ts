// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitroPreset = process.env["NITRO_PRESET"];
// GitHub Pages project sites serve from a subdirectory (e.g. /my-repo/).
// The workflow sets NITRO_APP_BASE_URL so assets, links, and the router all
// resolve under that subdirectory.
const basePath = process.env["NITRO_APP_BASE_URL"];
const isStaticPreset = nitroPreset === "github-pages" || nitroPreset === "static";

export default defineConfig({
  ...(nitroPreset ? { nitro: { preset: nitroPreset } } : {}),
  ...(basePath ? { vite: { base: basePath } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Prerender routes to static HTML when building for static hosting
    // (GitHub Pages). The Lovable/Cloudflare build keeps normal SSR.
    ...(isStaticPreset
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
            autoStaticPathsDiscovery: true,
            failOnError: true,
          },
          ...(basePath
            ? { router: { basepath: basePath.replace(/\/+$/, "") || "/" } }
            : {}),
        }
      : {}),
  },
});
