import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import qiankun from "vite-plugin-qiankun";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls,
      },
    }),
    quasar({
      sassVariables: "src/css/quasar-variables.sass",
    }),
    qiankun("templete_web", {
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: process.env.NODE_ENV == "development" ? "/" : "/__public_path__/",
  build: {
    outDir: "dist/inventory",
  },
  server: {
    open: true,
    port: 4200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    },
    https:
      process.env.NODE_ENV == "development"
        ? {
            cert: fs.readFileSync("../ssl/localhost.crt"),
            key: fs.readFileSync("../ssl/localhost.key"),
          }
        : true,
    hmr: {
      host: "localhost",
    },
  },
});
