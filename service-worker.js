// CompTime Tracker Service Worker
// Version 2.0.0

const CACHE_NAME = 'comptime-tracker-v2.0.0';
const RUNTIME_CACHE = 'comptime-runtime-v2.0.0';

// Assets to cache on install
const PRECACHE_URLS = [
  './',
  './Main.html',
  './app-script.html',
  './styles.html',
  './navigation.html',
  './page-views.html',
  './modals.html',
  './manifest.json',
  // CDN resources will be cached on first access
];

// Install event - cache essential assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            // Remove old caches
            return cacheName.startsWith('comptime-') &&
                   cacheName !== CACHE_NAME &&
                   cacheName !== RUNTIME_CACHE;
          })
          .map(cacheName => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Chrome extensions and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip Google Apps Script API calls and Firebase requests
  if (url.hostname.includes('script.google.com') ||
      url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('firebase.google.com') ||
      url.hostname.includes('googleapis.com')) {
    // Network only for API calls
    event.respondWith(fetch(request));
    return;
  }

  // Cache-first strategy for CDN resources (Bootstrap, Firebase SDK)
  if (url.hostname.includes('cdn.jsdelivr.net') ||
      url.hostname.includes('unpkg.com') ||
      url.hostname.includes('gstatic.com')) {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return caches.open(RUNTIME_CACHE).then(cache => {
            return fetch(request).then(response => {
              // Cache successful responses
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            });
          });
        })
        .catch(() => {
          // Return a custom offline page or response
          return new Response('Offline - CDN resource not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        })
    );
    return;
  }

  // Network-first strategy for app pages (always try to get fresh content)
  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful responses
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // Return offline page for HTML requests
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('./Main.html');
            }

            // Return generic offline response
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then(cache => cache.addAll(event.data.urls))
    );
  }
});

// Background sync for offline data submission (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Placeholder for syncing offline data
async function syncData() {
  // Future enhancement: sync any offline changes to Firestore
  console.log('[Service Worker] Background sync triggered');
  return Promise.resolve();
}

// Push notifications support (future enhancement)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'You have a new notification',
      icon: './icons/icon-192x192.png',
      badge: './icons/icon-96x96.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || './'
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'CompTime Tracker', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

console.log('[Service Worker] Loaded successfully');
