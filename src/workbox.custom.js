// / <reference path="./index.d.ts" />

// cache images
workbox.routing.registerRoute(
  ({ url }) => {
    console.log(/\.(jpg|jpeg|svg|png)/.test(url), 'its an image', url)
    return /\.(jpg|jpeg|svg|png)/.test(url)
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

// cache api requests
workbox.routing.registerRoute(
  ({ url }) => /tracks/.test(url),
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
  ({ url }) => {
    console.log('URL', url)
    return new RegExp('.*.mp3').test(url)
  },
  workbox.strategies.cacheFirst({
    cacheName: 'audio-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
      }),
    ],
  }),
)
