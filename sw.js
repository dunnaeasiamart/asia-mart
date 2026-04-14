// sw.js - 캐시 없이 항상 최신 버전 제공
const CACHE_NAME = 'asia-mart-v' + Date.now();

// 설치 시 기존 캐시 전부 삭제
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
});

// 활성화 시 기존 캐시 전부 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// 항상 네트워크에서 최신 버전 가져오기 (캐시 사용 안 함)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .catch(() => caches.match(event.request))
  );
});
