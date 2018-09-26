workbox.routing.registerRoute(
  ({ url }) => {
    console.log(url)
    return /\.(jpg|jpeg|svg|png)/.test(url.href)
  },
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

workbox.routing.registerRoute(
  ({ url }) => /tracks/.test(url.href),
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
