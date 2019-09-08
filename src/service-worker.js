// Version @TIMESTAMP@

'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/vendor.js',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

self.toolbox.router.any('/assets/*', self.toolbox.cacheFirst);
self.toolbox.router.any('/build/*', self.toolbox.cacheFirst);
self.toolbox.router.any('/wp/media/*', self.toolbox.cacheFirst);

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
