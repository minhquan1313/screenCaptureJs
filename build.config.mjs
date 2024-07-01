import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",

  platform: "browser",
  format: "esm",

  // packages: "external",
  bundle: true,
  minify: true,
  legalComments: "none",
});
