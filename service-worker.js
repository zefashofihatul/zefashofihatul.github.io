importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

// Pertama kali changing atau precaching
workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/detail.html/', revision: '1' },
    { url: '/index.js', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/logo_192.png', revision: '1' },
    { url: '/logo_512.png', revision: '1' },
    { url: '/img/background1.jpg', revision: '1' },
    { url: '/img/background2.jpg', revision: '1' },
    { url: '/img/background3.jpg', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api_module/api.js', revision: '1' },
    { url: '/js/detail.js', revision: '1' },
    { url: '/js/service_worker_activate/sw.js', revision: '1' },
    { url: '/js/database_module/db.js', revision: '1' },
    { url: '/js/database_module/idb.js', revision: '1' },
    { url: '/js/third_party/materialize_activate.js', revision: '1' },
    { url: '/js/third_party/materialize.min.js', revision: '1' },
    { url: '/js/rendering_module/helper.js', revision: '1' },
    { url: '/js/rendering_module/renderDetail.js', revision: '1' },
    { url: '/js/rendering_module/renderKlasemen.js', revision: '1' },
    { url: '/js/rendering_module/renderMatch.js', revision: '1' },
    { url: '/js/rendering_module/renderSaved.js', revision: '1' },
    { url: '/js/rendering_module/renderSavedById.js', revision: '1' },
    { url: '/js/rendering_module/renderScore.js', revision: '1' },
    { url: '/pages/klasemen.html', revision: '1' },
    { url: '/pages/match.html', revision: '1' },
    { url: '/pages/score.html', revision: '1' },
    { url: '/pages/favorites.html', revision: '1' },
],  {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)


// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.png'),
    workbox.strategies.cacheFirst()
);


workbox.routing.registerRoute(
  new RegExp('/detail.html'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('/detail.html/'),
    workbox.strategies.cacheFirst()
);


self.addEventListener('push', function(event) {
  console.log("Push Dipanggil");
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: './logo_192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification: LAST MATCH', options)
  );
});