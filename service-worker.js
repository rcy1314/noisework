var cacheName = 'Noise主页-v2.21';
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

  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f83b646a4cee41e588ca023e2a114e2f.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/bc6473e95d7f4bd1ba2f91d1cf632dfe.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/914f70446ab3414a8b2d2c75be8135a4.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/9e782b9469e04a67a64022a3cb964c83.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/fd1d5b76283f424ab83cd040f15feb3b.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/c570029d2db34069ab3009f779ccf41f.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f722dfc4481347f1b9df0572bf8bd6a5.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/1719a2f412cb4c57a0264a4c06e72f5d.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/4cff93ffad0542af96e78f0b47a6c13b.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/77e10d9cf3884d21b443f94ce01c4bb9.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/439381abd4b14efa98960e55f6073609.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f3fc238bd9d94a489e5a060c18733fbf.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/6845544115af4e42b919c53721688aff.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/6af08f9efc454e69b2f37e438279d7ea.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/e26f5c41a7bc4d42b6af0c7d20f22ce2.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/w0kRrJ.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/4535fe8ade84441085e5604db4f589ed.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/%E4%B8%8B%E8%BD%BD.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/20240812_164231.MP4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/20240812_164742.MP4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/ocDBeQ6Avp8zDaGjQCB9VRNnAAAf1NhlgI9EDM%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/osbAADGCxEASJEUiWgUcatQ0vghB4BzkzIceuf%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oEWaQDEDf3fA29igEmmHAq4IlEFhB9AhLRBDWg%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oIQFErG7qBmfVoneBBAekQ8cIb9HMZDC7QZEhA%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oYZZiIwTMFmA0kRm6yDfBeJA9AOn1g4NbQbxsK%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/ocf2RDOy9AXXAvQBC.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/o8CVABWheDHtvi2rmgQ0JEsyIAjy3HzOyn3AfB%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oYYsgHYNIwzJBgeDW5JfQpfaA7ywExA2Bkfoec%20-%2001.mp4",
  "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/50b8d286b4104a78b8db00ee85296516.mp4",
  
  '../assets/logoDiv/logo10.gif',
  '../assets/logoDiv/logo9.gif',
  '../assets/logoDiv/logo7.gif',
  '../assets/logoDiv/logo6.gif',
  '../assets/logoDiv/logo5.gif',
  '../assets/logoDiv/logo4.gif',
  '../assets/logoDiv/logo3.gif',
  '../assets/logoDiv/logo2.gif',
  '../assets/logoDiv/logo1.gif',
  '../assets/logoDiv/logo11.gif',
  '../assets/logoDiv/logo12.gif',
  '../assets/logoDiv/logo13.gif',
  '../assets/logoDiv/logo15.gif',
  '../assets/logoDiv/logo14.gif',
  '../assets/logoDiv/logo8.gif',
  '../assets/mobileLogoDiv/mobileLogo7.gif',
  '../assets/mobileLogoDiv/mobileLogo1.gif',
  '../assets/mobileLogoDiv/mobileLogo2.gif',
  '../assets/mobileLogoDiv/mobileLogo3.gif',
  '../assets/mobileLogoDiv/mobileLogo4.gif',
  '../assets/mobileLogoDiv/mobileLogo8.gif',
  '../assets/mobileLogoDiv/mobileLogo9.gif',
  '../assets/mobileLogoDiv/mobileLogo10.gif',
  '../assets/mobileLogoDiv/mobileLogo11.gif',
 
  './assets/suijpic/191437o3371I8.webp',
  './assets/suijpic/2308hbVHt.webp',
  './assets/suijpic/184324ohb.webp',
  './assets/suijpic/113422owH.webp',
  './assets/suijpic/004Cwsr1.webp',
  './assets/suijpic/023vgGAy.webp',
  './assets/suijpic/004uMVZ9.webp',
  './assets/suijpic/5557j.4leby4kmx5a0.webp',
  './assets/suijpic/Dungeon.86tfxtuodsw.webp',
  './assets/suijpic/09.45yi39hb3xo0.webp',
  './assets/suijpic/3432.1wdm7a7jplb4.webp',
  './assets/suijpic/asfa.yls71bi1eog.webp',
  './assets/suijpic/ffass.omhkiqmx0ww.webp',
  './assets/suijpic/fasfasf.1qt1n1e9q8yo.webp',

  './assets/suijpic/023.5se6p3kcd840.webp',
  './assets/suijpic/人物5.34tnn2jnn1q0.webp',
  './assets/suijpic/004.47zk9hg17zg0.webp',
  './assets/suijpic/人物4.6u794zv9r5w0.webp',
  './assets/suijpic/人物11.7ldvybjc00s0.webp',
  './assets/suijpic/人物41.1maz1wruetnk.webp',
  './assets/suijpic/人物17.3v6jydd7z4i0.webp',
  './assets/suijpic/人物1.3idck6fcxqo0.webp',
  './assets/suijpic/人物28.32bk8ikwy4a0.webp',
  './assets/suijpic/人物22.6vhc266zg900.webp',
  './assets/suijpic/人物25.5j6k4o4lqa40.webp',
  './assets/suijpic/213d.51b3hpotx9s0.webp',
  './assets/suijpic/028.5teioy5ve2c0.webp',
  './assets/suijpic/人物45.4x3k6s924ns0.webp',
  './assets/suijpic/人物24.1rx0saszu6cg.webp',
  './assets/suijpic/人物48.67uswm33xes0.webp',
  './assets/suijpic/人物49.5elqamd33io0.webp',
  './assets/suijpic/人物50.567n54xp81s0.webp',
  './assets/suijpic/人物34.s8gkq0h3dls.webp',
  './assets/suijpic/029.71q4mgfwdo00.webp',
  './assets/suijpic/011.3eqe3vsal0m0.webp',
  './assets/suijpic/021.4uqonnvv0xw0.webp',
  './assets/suijpic/xiaohuangren.60nxvrux8c80.webp',
  './assets/suijpic/007.4ra12856l3q0.webp',
  './assets/suijpic/006.5fr6malj99o0.webp',
  './assets/suijpic/0052.4nzyymaa8za0.webp',
  './assets/suijpic/003.70upv2n3s9w0.webp',
  './assets/suijpic/001.3jr66nchfja0.webp',
  './assets/suijpic/025.4kt2ai85mx60.webp',
  './assets/suijpic/026.3v8fb37c3i40.webp',
  './assets/suijpic/022.6i76zb73k240.webp',
  './assets/suijpic/001.webp',
  './assets/suijpic/002.webp',
  './assets/suijpic/0003.webp',
  './assets/suijpic/0004.webp',
  './assets/suijpic/0005.webp',
  './assets/suijpic/0006.webp',
  './assets/suijpic/0007.webp',
  './assets/suijpic/0008.webp',
  './assets/suijpic/0010.webp',
  './assets/suijpic/0011.webp',

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
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // 添加压缩响应头
        const headers = new Headers(response.headers);
        headers.set('Content-Encoding', 'gzip');
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: headers
        });
      }
      return fetch(event.request);
    })
  );
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
