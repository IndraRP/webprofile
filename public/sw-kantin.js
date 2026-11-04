const CACHE_NAME = "wahana-kantin-v1";
const STATIC_ASSETS = [
  "/wahanakantin-form",
  "/wahanakantin-manifest.json",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Hanya proses GET requests lokal, jangan intercept Apps Script Web App atau external API
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Jangan cache panggilan API Google Apps Script
  if (url.hostname.includes("google") || url.pathname.includes("script.google.com")) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

