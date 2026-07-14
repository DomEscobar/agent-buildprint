import { defineConfig } from "vite";

const config = defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

export default config;
