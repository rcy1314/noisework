self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('Noise主页').then(function(cache) {
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
        return response || fetch(event.request);
      })
    );
  });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
    