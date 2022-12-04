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