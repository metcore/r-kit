import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/index.css",
  ],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true, 
  treeshake: true, 
  minify: false,
  loader: {
    ".css": "css",
  },
  tsconfig: "./tsconfig.build.json",
  external: [
    "react",
    "react-dom",
    "clsx",
    "class-variance-authority",
    "tailwind-merge",
  ],
});