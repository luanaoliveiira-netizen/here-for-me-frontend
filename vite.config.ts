import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// ⚠️ Plugin de DEV apenas
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),

    // 👉 só usa esse plugin em desenvolvimento
    ...(mode === "development" ? [jsxLocPlugin()] : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
  },
}));
