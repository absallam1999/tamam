import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react({
        fastRefresh: true,
        babel: {
          plugins: [
            ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
          ],
        },
      }),
    ],

    // Path resolution aliases
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },

    // Development server configuration
    server: {
      port: 4173,
      strictPort: false,
      open: true,
      host: true,
      cors: true,
      // Proxy API requests to backend during development
      proxy: {
        "/api": {

          // DEV
          target: "http://tamam.runasp.net",
          
          // PRO
          // target: "http://api.tamaam.cloud",
          
          changeOrigin: true,
          secure: false,
          // Optional: Log proxy activity for debugging
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("[Proxy Error]", err.message);
            });
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log("[Proxy Request]", req.method, req.url, "→", proxyReq.path);
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log("[Proxy Response]", proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },

    // Build configuration
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: !isProduction,
      minify: isProduction ? "esbuild" : false,
      target: "es2020",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (
                id.includes("react") ||
                id.includes("react-dom") ||
                id.includes("react-router-dom")
              ) {
                return "vendor-react";
              }

              if (id.includes("i18next") || id.includes("react-i18next")) {
                return "vendor-i18n";
              }

              if (id.includes("lucide-react")) {
                return "vendor-ui";
              }

              return "vendor";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      cssMinify: isProduction,
      reportCompressedSize: true,
    },

    // CSS configuration
    css: {
      devSourcemap: true,
      postcss: "./postcss.config.js", // Explicitly specify PostCSS config
    },

    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // Optimization
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "i18next",
        "react-i18next",
        "i18next-browser-languagedetector",
        "lucide-react",
      ],
      exclude: [],
    },

    // Static assets handling
    assetsInclude: ["**/*.glb", "**/*.gltf"],
  };
});