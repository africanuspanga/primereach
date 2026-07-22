// Build a static `out/` folder for static-only hosting (Model A).
//
// A static export (`output: "export"`) cannot contain Server Actions or
// non-GET Route Handlers — Next.js errors at build time if they exist — and a
// dynamic route must set `dynamicParams = false` (no server to render unknown
// slugs on-demand). So for the duration of the export build this script:
//   • moves the admin panel (Server Actions) and API routes (POST) aside, and
//   • patches `dynamicParams = true` → `false` in the dynamic route pages.
// Everything is restored afterwards — the working tree is left untouched.
//
// Usage:  npm run build:static   →   produces ./out
//
// The default `npm run build` is unaffected and keeps every server feature.

import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const HOLD = join(root, ".static-build-excluded");

// Route trees that require a Node server and cannot be statically exported.
const EXCLUDE = ["src/app/admin", "src/app/api"];

// In-file edits needed only for the static build. `dynamicParams` must be a
// static boolean literal (Turbopack cannot read an env expression), so we swap
// the literal here rather than in the source.
const PATCH = [
  {
    rel: "src/app/capabilities/[slug]/page.tsx",
    find: "export const dynamicParams = true;",
    replace: "export const dynamicParams = false;",
  },
  {
    rel: "src/app/solutions/[slug]/page.tsx",
    find: "export const dynamicParams = true;",
    replace: "export const dynamicParams = false;",
  },
];

// Every path we stash under HOLD — pristine originals live there until restored.
const ALL_RELS = [...EXCLUDE, ...PATCH.map((p) => p.rel)];

function stashOriginal(rel) {
  const from = join(root, rel);
  if (!existsSync(from)) return false;
  const to = join(HOLD, rel);
  mkdirSync(dirname(to), { recursive: true });
  renameSync(from, to);
  return true;
}

function prepare() {
  mkdirSync(HOLD, { recursive: true });
  for (const rel of EXCLUDE) {
    if (stashOriginal(rel)) console.log(`  excluded  ${rel}`);
  }
  for (const p of PATCH) {
    const orig = join(root, p.rel);
    if (!existsSync(orig)) continue;
    const content = readFileSync(orig, "utf8");
    if (!content.includes(p.find)) {
      throw new Error(`build-static: expected ${JSON.stringify(p.find)} in ${p.rel}`);
    }
    stashOriginal(p.rel); // keep pristine copy in HOLD
    writeFileSync(orig, content.replace(p.find, p.replace));
    console.log(`  patched   ${p.rel}`);
  }
}

// Move every stashed original back over its working-tree path. Safe to run at
// any time (start-of-run recovery from a killed build, or normal teardown).
function restore() {
  if (!existsSync(HOLD)) return;
  for (const rel of ALL_RELS) {
    const backup = join(HOLD, rel);
    if (!existsSync(backup)) continue;
    const target = join(root, rel);
    if (existsSync(target)) rmSync(target, { recursive: true, force: true });
    mkdirSync(dirname(target), { recursive: true });
    renameSync(backup, target);
  }
  rmSync(HOLD, { recursive: true, force: true });
}

// Recover from any previous run that was killed mid-build.
restore();

let restored = false;
const restoreOnce = () => {
  if (restored) return;
  restored = true;
  restore();
};
process.on("SIGINT", () => {
  restoreOnce();
  process.exit(130);
});
process.on("SIGTERM", () => {
  restoreOnce();
  process.exit(143);
});

console.log("Building static export → out/  (admin panel + API routes excluded)\n");
prepare();
try {
  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env, BUILD_TARGET: "static" },
  });
  console.log("\n✔ Static site written to ./out — deploy its contents to any static host.");
} finally {
  restoreOnce();
}
