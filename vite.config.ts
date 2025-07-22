import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/webprofile/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"],
      manifest: {
        name: "Web Profile",
        short_name: "Profile",
        description: "Profil PWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/webprofile/",
        icons: [
          {
            src: "/webprofile/logoindra.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/webprofile/logoindra.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
