// Renders the app's routes to static HTML after the GitHub Pages build.
//
// `vite build` with NITRO_PRESET=github-pages compiles the SSR handler to
// node_modules/.nitro/vite/services/ssr/index.js and copies client assets to
// .output/public, but nitro's built-in prerenderer fails for apps that redirect
// "/" to a base path (GitHub Pages project sites). This script imports the
// compiled handler directly, fetches the base URL, and writes the HTML.
import { existsSync, readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const base = (process.env.NITRO_APP_BASE_URL ?? "/").replace(/\/+$/, "");
const outDir = resolve(root, ".output/public");

const handlerCandidates = [
  "node_modules/.nitro/vite/services/ssr/index.js",
  "dist/server/server.js",
];

function findHandler() {
  for (const rel of handlerCandidates) {
    const abs = resolve(root, rel);
    if (existsSync(abs)) return abs;
  }
  // Fall back to searching nitro's vite workspace for the compiled SSR entry.
  const nitroDir = resolve(root, "node_modules/.nitro/vite");
  if (existsSync(nitroDir)) {
    for (const entry of readdirSync(nitroDir, { recursive: true })) {
      if (entry.endsWith("ssr/index.js")) return join(nitroDir, entry);
    }
  }
  throw new Error(
    "Could not locate the compiled SSR handler. Run the vite build first."
  );
}

const handlerPath = findHandler();
const mod = await import(pathToFileURL(handlerPath).href);
const handler = mod.default ?? mod;
if (typeof handler?.fetch !== "function") {
  throw new Error(`SSR handler at ${handlerPath} has no fetch() export`);
}

await mkdir(outDir, { recursive: true });
for (const target of ["/", "/404.html"]) {
  const res = await handler.fetch(
    new Request(`http://localhost${base}/`, { redirect: "manual" })
  );
  const html = await res.text();
  if (res.status !== 200 || !html.includes("<")) {
    throw new Error(
      `Prerender failed for ${base}/ (status ${res.status}); aborting.`
    );
  }
  const file = resolve(outDir, `.${target === "/" ? "/index" : target}.html`);
  await writeFile(resolve(outDir, target === "/" ? "index.html" : "404.html"), html);
  console.log(`[prerender] wrote ${target} -> ${file.replace(root, ".")} (${html.length} bytes)`);
}
