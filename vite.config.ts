import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],

    server: {
      allowedHosts: env?.BASE_URL ? env.BASE_URL.split(',') : [],
    },
    build: {
      outDir: '../dist-docs',
      emptyOutDir: true,
    },
  };
});
