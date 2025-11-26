import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // entry
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "r-kit",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "react",
        "react-dom",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "class-variance-authority": "CVA",
        },
      },
    },
  },
});
