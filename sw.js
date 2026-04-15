// 캐시 완전 비활성화 - 항상 네트워크에서 최신 버전 로드
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => fetch(e.request))
  );
});
