// cache images
workbox.routing.registerRoute(
  /\.(jpg|jpeg|svg|png)/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

// cache api requests
workbox.routing.registerRoute(
  /tracks/,
  workbox.strategies.cacheFirst({
    cacheName: 'tracks-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
)

// cache audio files
workbox.routing.registerRoute(
  new RegExp('.*.mp3'),
  workbox.strategies.cacheFirst({
    cacheName: 'audio-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
      }),
    ],
  }),
)
