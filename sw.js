const CACHE_NAME = 'nily-playhouse-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/site/favicon.png',
  '/assets/site/icons/icon-192.png',
  '/assets/site/icons/icon-512.png',
  '/assets/site/icons/apple-touch-icon.png',
  '/activities/multiply-magic/index.html',
  '/activities/multiply-magic/favicon.png',
  '/activities/alphabet-play/index.html',
  '/activities/alphabet-play/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
