var cacheName = 'Noise主页-v2.20';
var assetsToCache = [
  './assets/sound/鼠点左1.mp3',
  './assets/sound/鼠点左2.mp3',
  './assets/sound/缓慢1.mp3',
  './assets/sound/风铃.mp3',
  './assets/sound/开瓶.mp3',
  './assets/sound/叮.mp3',
  './assets/sound/嘟.mp3',
  './assets/sound/动1.mp3',
  './assets/sound/滴滴.mp3',
  './assets/sound/打字.mp3',
  './assets/sound/jump.mp3',
  './assets/sound/载入1.mp3',
  './assets/sound/载入2.mp3',
  './assets/sound/载入3.mp3',
  './assets/sound/载入4.mp3',
  './assets/sound/载入5.mp3',
  './assets/sound/载入6.mp3',
  './assets/sound/载入7.mp3',
  './assets/sound/载入8.mp3',
  './assets/sound/载入9.mp3',

  './assets/r1.png',
  './assets/r3.png',
  './assets/31.jpeg',
  './assets/31.jpeg',
  './assets/3.png',
  './assets/1ae.gif',
  './assets/2ae.gif',
  './assets/3ae.gif',
  './assets/4ae.gif',
  './assets/5ae.gif',
  './assets/6ae.gif',
  'js/sound.js',
  './js/jquery.min.js',
  './js/APlayer.min.js',
  './js/Meting.min.js',
  './js/suiji-picture.js',
  './js/Right.js',
  './js/subscription-form.js',
  './js/bilibili-video.js',
  './js/main.js',
  './js/home-script.js',
  './js/AD.js',
  './js/emb.js',
  'js/hotindex.js',
  './css/home-APlayer.min.css',
  './css/home-style.css',
  './css/root.css',
  './css/style.css',
  '/css/main.css',
  '/css/hotindex.css',

  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo10.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo9.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo7.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo6.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo5.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo4.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo3.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo2.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo1.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo11.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo12.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo13.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo15.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo14.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo8.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo7.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo1.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo2.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo3.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo4.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo8.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo9.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo10.gif',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo11.gif',
 
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/191437o3371I8.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/2308hbVHt.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/184324ohb.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/113422owH.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/004Cwsr1.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/023vgGAy.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/004uMVZ9.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230705/5557j.4leby4kmx5a0.jpg',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230705/Dungeon.86tfxtuodsw.jpg',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230418/09.45yi39hb3xo0.jpg',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230705/3432.1wdm7a7jplb4.jpg',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230705/asfa.yls71bi1eog.jpg',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230705/ffass.omhkiqmx0ww.jpg',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230705/fasfasf.1qt1n1e9q8yo.jpg',

  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/023.5se6p3kcd840.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物5.34tnn2jnn1q0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/004.47zk9hg17zg0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物4.6u794zv9r5w0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物11.7ldvybjc00s0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230301/人物41.1maz1wruetnk.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物17.3v6jydd7z4i0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物1.3idck6fcxqo0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物28.32bk8ikwy4a0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物22.6vhc266zg900.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230227/人物25.5j6k4o4lqa40.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230706/213d.51b3hpotx9s0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/028.5teioy5ve2c0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230301/人物45.4x3k6s924ns0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230305/人物24.1rx0saszu6cg.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230301/人物48.67uswm33xes0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230301/人物49.5elqamd33io0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230301/人物50.567n54xp81s0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/my-photo@master/20230301/人物34.s8gkq0h3dls.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/029.71q4mgfwdo00.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/011.3eqe3vsal0m0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/021.4uqonnvv0xw0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230706/xiaohuangren.60nxvrux8c80.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/007.4ra12856l3q0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/006.5fr6malj99o0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230706/0052.4nzyymaa8za0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/003.70upv2n3s9w0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/001.3jr66nchfja0.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/025.4kt2ai85mx60.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/026.3v8fb37c3i40.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/20230704/022.6i76zb73k240.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/001.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/002.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0003.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0004.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0005.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0006.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0007.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0008.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0010.png',
  'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/0011.png',

  './assets/bg/bg1.png',
  './assets/bg/bg2.png',
  './assets/bg/bg3.png',
  './assets/bg/bg4.png',
  './assets/bg/bg5.png',
  './assets/bg/bg6.png',
  './assets/bg/bg7.png',
  './assets/bg/bg8.png',
  './assets/bg/bg9.png',
  './assets/bg/bg10.png',
  './assets/bg/bg11.png',
  './assets/bg/bg12.png',

  './assets/mobilebg/bg1.png',
  './assets/mobilebg/bg2.png',
  './assets/mobilebg/bg3.png',
  './assets/mobilebg/bg4.png',
  './assets/mobilebg/bg5.png',
  './assets/mobilebgbg6.png',
  './assets/mobilebg/bg7.png',
  './assets/mobilebg/bg8.png',
  './assets/mobilebg/bg9.png',
 
  // 添加您需要缓存的其他静态资源
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== cacheName;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var request = event.request;

  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  if (isCriticalRequest(request)) {
    event.respondWith(
      caches.match(request).then(function(response) {
        return response || fetchAndCache(request);
      })
    );
  } else {
    event.respondWith(lazyLoad(request));
  }
});

function fetchAndCache(request) {
  return fetch(request).then(function(networkResponse) {
    return caches.open(cacheName).then(function(cache) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    });
  }).catch(function() {
    return caches.match('/index.html');
  });
}

function isCriticalRequest(request) {
  return request.url.includes('/home/');
}

function lazyLoad(request) {
  return fetch(request).catch(function() {
    return caches.match(request);
  });
}

function cleanUpCache() {
  caches.keys().then(function(cacheNames) {
    cacheNames.forEach(function(cacheName) {
      caches.open(cacheName).then(function(cache) {
        cache.keys().then(function(keys) {
          keys.forEach(function(key) {
            // 根据需求实现清理逻辑，例如基于最后修改时间或大小
          });
        });
      });
    });
  });
}

function monitorPerformance() {
  self.performance = self.performance || {};
  self.performance.timing = performance.timing;
  self.performance.navigation = performance.navigation;

  // 记录缓存命中情况
  self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) {
            self.performance.cacheHits = self.performance.cacheHits || 0;
            self.performance.cacheHits++;
          } else {
            self.performance.cacheMisses = self.performance.cacheMisses || 0;
            self.performance.cacheMisses++;
          }
          return response || fetch(event.request);
        })
      );
    }
  });
}
// 定时刷新缓存
//setInterval(function() {
//  updateCache();
// }, 24 * 60 * 60 * 1000);

//function updateCache() {
//  assetsToCache.forEach(function(asset) {
//    fetchAndCache(new Request(asset));
//  });
// }

// 初始化性能监控和缓存清理
monitorPerformance();
cleanUpCache();
