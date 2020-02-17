importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('push', event => {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'img/icons/android-chrome-512x512.png',
        vibrate: [100, 50, 100]
    });
});

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('https://www.student-fridge.fr');
      notification.close();
    }
  });

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

workbox.precaching.precacheAndRoute([]);
