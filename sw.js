importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

console.log( "workbox 6 | 20220823", workbox )
const {registerRoute} = workbox.routing;
const {NetworkFirst} = workbox.strategies;
//  const {CacheableResponsePlugin} = workbox.cacheable.response;

workbox.LOG_LEVEL = "debug";
//console.log("Syhper SW Begin | " + workbox.LOG_LEVEL );
try {
  clients.claim();
console.log(" == == == sw | claimed --", navigator.serviceWorker.controller )
} catch (error) {
console.log(" == == == sw | not claiming --")
}

const cacheName = 'sampleCache';
//  const matchCallback = ({request}) => request.mode === 'navigate';
const matchCallback = ({request}) => {
if(request.url.indexOf(".vue") != -1) console.log("---- sw req | ", request.url)
  return true;
};

const networkTimeoutSeconds = 3;

registerRoute(
  matchCallback,
  new NetworkFirst({
    networkTimeoutSeconds,
    "cacheName": "sampleCache",
    "matchOptions": {"ingoreSearch": true}
  })
);