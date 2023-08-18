var cacheName = 'Noise主页-v1.0.0';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/assets/',
        '/css/main.css',
        '/js/main.js',
        // 添加您需要缓存的其他静态资源
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      // 如果请求未在缓存中找到，则发起网络请求
      return fetch(event.request).then(function(networkResponse) {
        // 将请求的响应添加到缓存中
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          // 删除旧版本的缓存
          return name !== cacheName;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});
