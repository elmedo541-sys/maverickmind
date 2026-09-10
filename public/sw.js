const CACHE_NAME = "maverickminds-cache-v1";
const OFFLINE_URL = "/";

// Minimal app-shell precache. Everything else is cached opportunistically
// as the user browses (stale-while-revalidate for GET requests).
const PRECACHE_ASSETS = ["/", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle same-origin GET requests. Let everything else (POST form
  // actions, admin API calls, cross-origin requests) pass straight through.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  // Never cache admin routes - they're dynamic/authenticated.
  if (request.url.includes("/admin")) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for page navigations.
          if (request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
          return cached;
        });

      return cached || networkFetch;
    })
  );
});
