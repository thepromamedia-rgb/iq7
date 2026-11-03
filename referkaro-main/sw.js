/* ReferKro PWA service worker.
 * Never cache API responses or user-specific HTML/data.
 * Navigation stays network-first so live website updates appear in the installed app.
 */
const CACHE_NAME = 'referkro-static-v3';
const STATIC_ASSETS = ['/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-192-maskable.png', '/icons/icon-512-maskable.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) return;
  if (request.mode === 'navigate' || url.pathname === '/manifest.json' || url.pathname === '/sw.js') return;

  if (url.pathname.startsWith('/icons/')) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => caches.match(request))
    );
  }
});
