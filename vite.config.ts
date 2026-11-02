import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "logoindra.png",
      ],
      manifest: {
        name: "Wahana Kantin - Form Transaksi",
        short_name: "Wahana Kantin",
        description:
          "Aplikasi Progressive Web App (PWA) pencatatan transaksi penjualan kantin",
        start_url: "/wahanakantin-form",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#020617",
        theme_color: "#059669",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Form Transaksi Kantin",
            short_name: "Kantin Form",
            description: "Buka formulir input transaksi penjualan Wahana Kantin",
            url: "/wahanakantin-form",
            icons: [
              {
                src: "pwa-192x192.png",
                sizes: "192x192",
              },
            ],
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6 MB
        navigateFallback: "/index.html",
      },
    }),
  ],
  base: "./",
});
