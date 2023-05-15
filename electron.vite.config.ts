import path from "node:path"
import tailwindcss from "tailwindcss"
import react from "@vitejs/plugin-react"
import tsConfigsPathsPlugin from "vite-tsconfig-paths"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"

const tsConfigPaths = tsConfigsPathsPlugin({
  projects: [path.resolve("tsconfig.json")],
})

export default defineConfig({
  main: {
    plugins: [tsConfigPaths, externalizeDepsPlugin()],

    publicDir: path.resolve("resources"),
  },
  preload: {
    plugins: [tsConfigPaths, externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: "./src/renderer/tailwind.config.js",
          }),
        ],
      },
    },
    resolve: {
      alias: {
        "@renderer": path.resolve("src/renderer/src"),
      },
    },
    plugins: [tsConfigPaths, react()],
    server: {
      port: 3000,
    },
  },
})
