self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('your-app-name').then(function(cache) {
        return cache.addAll([
          '/',
          '/static/',
          'style.css',
          'index.html',
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
    