const VERSION = 'nw-sw-v1';
const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/home.html',
  '/css/main.css',
  '/css/terminal.css',
  '/css/fira_code.css',
  '/js/jquery.min.js',
  '/js/parallax.min.js',
  '/js/main.js',
  '/js/lowmain.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHtml(request) {
  return request.destination === 'document' || (request.headers && request.headers.get('accept') || '').includes('text/html');
}

function isStatic(request) {
  return ['script','style','image','font'].includes(request.destination);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (isHtml(request)) {
    // Network-first for HTML
    event.respondWith(
      fetch(request).then((resp) => {
        const copy = resp.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        return resp;
      }).catch(() => caches.match(request))
    );
    return;
  }

  if (isStatic(request)) {
    // Cache-first with stale-while-revalidate for static resources
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((resp) => {
          const copy = resp.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return resp;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
});
