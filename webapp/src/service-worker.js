importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('push', event => {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
        badge:'img/icons/android-icon-36x36.png',
        icon: 'img/icons/android-icon-192x192.png',
        vibrate: [100, 50, 100]
    });
});

self.addEventListener('notificationclick', function(e) {
    var action = e.action;
  
    if (action === 'close') {
        e.notification.close();
    } else {
        const rootUrl = new URL('/', location).href;
        e.notification.close();
        // Enumerate windows, and call window.focus(), or open a new one.
        e.waitUntil(
          clients.matchAll().then(matchedClients => {
            for (let client of matchedClients) {
              if (client.url === rootUrl) {
                return client.focus();
              }
            }
            return clients.openWindow("/");
          })
        );
    }
  });

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

workbox.precaching.precacheAndRoute([]);
