// sw.js - The Service Worker
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/355/355980.png',
    vibrate: [200, 100, 200],
    tag: 'power-anomaly',
    renotify: true,
    data: { url: self.location.origin } 
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle clicking the notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
