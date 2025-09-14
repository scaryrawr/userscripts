import { readdirSync } from "node:fs";
import { join } from "node:path";

const entriesDir = "scripts";
const outDir = "dist";

for (const name of readdirSync(entriesDir)) {
  const entryPath = join(entriesDir, name, "index.ts");
  const metaPath = join(entriesDir, name, "meta.js");

  const banner = await Bun.file(metaPath).text();

  await Bun.build({
    entrypoints: [entryPath],
    outdir: outDir,
    naming: `${name}.user.js`,
    minify: false,
    banner,
    target: "browser",
  });

  console.log(`✅ Built ${name}`);
}
