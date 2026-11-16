/**
 * Static hosts serve files, not routes. A visitor who refreshes on
 * /categories/gaming asks the host for a file that does not exist, and gets a
 * 404 before React Router ever runs.
 *
 * GitHub Pages serves 404.html for any unmatched path, so copying index.html
 * to 404.html hands those requests back to the app, which then renders the
 * right route from the URL.
 *
 * Runs automatically after `npm run build` via the postbuild script.
 */

import { copyFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const source = join(distDir, "index.html");
const target = join(distDir, "404.html");

try {
  await access(source);
} catch {
  console.error(`spa-fallback: ${source} not found — did the build run?`);
  process.exit(1);
}

await copyFile(source, target);
console.log("spa-fallback: wrote dist/404.html for client-side routing");
