import { defineConfig, type Rolldown } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm"],
  platform: "browser",
  clean: true,
  outDir: "dist",
  css: {
    modules: {
      generateScopedName: "design-system-[local]",
    },
  },
});
