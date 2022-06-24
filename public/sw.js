const dataCacheName = 'pwa-project-data';
const cacheName = 'pwa-projet';
const filesToCache = [
  '/',
  '/index.html',
  '/icon.png',
  '/css/reset.css',
  '/css/responsive.css',
  '/css/styles.css',
  '/js/game.js',
  '/js/jquery-flip.min.js',
  '/js/jquery-ui.min.js',
  '/js/jquery.min.js'
];

//////// SERVICE WORKER FOR PWA ///////////

//install the sw
self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});