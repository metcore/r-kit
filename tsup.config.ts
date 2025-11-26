import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: false,
  treeshake: false,
  tsconfig: "./tsconfig.build.json",
  external: [
    "react",
    "react-dom",
    "clsx",
    "class-variance-authority",
    "tailwind-merge",
  ],
});
