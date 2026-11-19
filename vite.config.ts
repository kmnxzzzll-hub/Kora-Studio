import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    // Lovable serves previews through its own domains; allow those hosts
    // without disabling Vite's host validation globally.
    allowedHosts: [".lovable.app", ".lovable.dev", ".lovableproject.com"],
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true
      }
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: false
  }
});
