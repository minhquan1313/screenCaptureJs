import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts", "src/index2.ts"],
  outdir: "dist",

  platform: "browser",
  format: "iife",

  loader: {
    ".svg": "text",
  },

  // packages: "external",
  bundle: true,
  minify: true,
  legalComments: "none",
});
