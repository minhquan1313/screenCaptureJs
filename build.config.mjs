import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/*.ts"],
  outdir: "dist",

  platform: "browser",
  format: "esm",

  loader: {
    ".svg": "text",
  },

  // packages: "external",
  bundle: true,
  minify: true,
  legalComments: "none",
});
