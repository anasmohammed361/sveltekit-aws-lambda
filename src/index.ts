import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Builder } from "@sveltejs/kit";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
import { build } from "esbuild";
import * as path from "path";
import { cp, rm } from "fs/promises";
async function bundleApp() {
  await rm(path.join("build"), { recursive: true, force: true });
  await build({
    entryPoints: [path.join("out", "server", "lambda-handler", "index.js")],
    bundle: true,
    platform: "node",
    target: ["esnext"],
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
    banner: {
      js: [
        `import { createRequire as topLevelCreateRequire } from 'module';`,
        `const require = topLevelCreateRequire(import.meta.url);`,
      ].join(""),
    },
    outdir: path.join("build"),
  });
  await cp(path.join("out", "prerendered"), path.join("build", "prerendered"), {
    recursive: true,
  });
}

function adapter() {
  const adapter = {
    name: "sachtak-adapter",
    async adapt(builder: Builder) {
      const out = path.join("out");
      const clientDir = path.join(out, "client");
      const serverDir = path.join(out, "server");
      const prerenderedDir = path.join(out, "prerendered");

      // Cleanup output folder
      builder.rimraf(out);
      // builder.mkdirp(clientDir);
      // builder.mkdirp(serverDir);
      // builder.mkdirp(prerenderedDir);

      // Create static output
      builder.log.minor("Copying assets...");
      builder.writeClient(clientDir);
      const prerenderedFiles = builder.writePrerendered(prerenderedDir);

      // Create Lambda function
      builder.log.minor("Generating server function...");
      builder.writeServer(serverDir);
      // copy over handler files in server handler folder
      builder.copy(
        path.join(__dirname, "handler"),
        path.join(serverDir, "lambda-handler")
      );
      // save a list of files in server handler folder
      fs.writeFileSync(
        path.join(serverDir, "lambda-handler", "prerendered-file-list.js"),
        `export default ${JSON.stringify(prerenderedFiles)}`
      );
    },
  };

  return adapter;
}

export { adapter, bundleApp };
