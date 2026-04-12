import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    proxy: {
      "/hf": {
        target: "https://router.huggingface.co",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/hf/, ""),
      },
    },
  },
});
