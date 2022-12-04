if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        // registration worked
        console.log('[Service Worker] Registration succeeded. Scope is ' + reg.scope);
      }).catch(error => {
        // registration failed
        console.log('[Service Worker] Registration failed with ' + error);
      });
  }
  // If we want to use await, we must be place the code in async function
// More reading https://github.com/tc39/proposal-top-level-await, https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221
async function mainAsync() {
  try {
    // create the promise asynchronously without blocking the thread
    // and wait for its result (the parameter passed to resolve)
    const nb1 = await generateRandomNumberAsync();
    console.log(nb1); // nb1 is not the promise but rather its result in case of success
    const nb2 = await generateRandomNumberAsync();
    console.log(nb2);
  } catch (error) {
    // this catch block is executed if any promise above fails
    console.error(error); // the error variable is the value passed to reject
  }
}
mainAsync(); // call the function that runs async code
console.log("Promise example with async / await");
const CACHE_NAME = "V2";

self.addEventListener("activate", event => {
  // delete any unexpected caches
  event.waitUntil(
    caches
      .keys()
      .then(keys => keys.filter(key => key !== CACHE_NAME))
      .then(keys =>
        Promise.all(
          keys.map(key => {
            console.log(`Deleting cache ${key}`);
            return caches.delete(key);
          })
        )
      )
  );
});
function refresh(response) {
  return response
    .json() // read and parse JSON response
    .then(jsonResponse => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          // report and send new data to client
          client.postMessage(
            JSON.stringify({
              type: response.url,
              data: jsonResponse.data
            })
          );
        });
      });
      return jsonResponse.data; // resolve promise with new data
    });
}