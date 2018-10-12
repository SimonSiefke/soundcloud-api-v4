const express = require('express')

const app = express()
const path = require('path')
const fs = require('fs')
const ndjson = require('ndjson')
const axios = require('axios')
const querystring = require('querystring')

const toNdJSOn = json => json.map(JSON.stringify).join('\n')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  const tracks = await Api_GetTracks()
  const jsonArray = tracks.newTracks.map(JSON.stringify)
  // const ndJSON = toNdJSOn(tracks.newTracks)

  console.log(tracks)
  // const readStream = fs
  //   .createReadStream(`${__dirname}/db.ndjson`)
  //   .pipe(ndjson.parse())

  // const chunks = []
  // readStream.on('data', (data) => {
  //   chunks.push(JSON.stringify(data))
  // })

  res.contentType('text/plain')

  // readStream.on('end', () => {
  const id = setInterval(() => {
    if (jsonArray.length) {
      res.write(`${jsonArray.shift()}\n`)
    } else {
      clearInterval(id)
      res.end()
    }
  }, 500)
  // })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

async function Api_GetTracks(options = {}) {
  const defaultRequestOptions = {
    limit: 60, // max number of tracks per request
    linked_partitioning: 1, // send 1 link with the next bulk of tracks
    client_id: 'nEUgbh6lRJ7mvPdBvWrL33FaKJJGtxFt',
    q: 'odesza',
  }
  const mergedOptions = Object.assign(defaultRequestOptions, options)
  try {
    const rawData = await axios.get(
      `https://api.soundcloud.com/tracks?${querystring.stringify(
        mergedOptions,
      )}`,
    )

    if (rawData) {
      const newTracks = rawData.data.collection.map((track, index) => ({
        id: track.id,
        cover: track.artwork_url
          ? track.artwork_url.replace('large', 'crop')
          : '',
        name: track.title,
        duration: track.duration,
        love: track.likes_count,
        link: track.permalink_url,
        genre: track.genre,
        userAvatar: track.user.avatar_url,
        userLink: track.user.permalink_url,
        userName: track.user.username,
        index,
        audioState: 'IDLE',
        audioShouldBeState: 'SHOULD_BE_IDLE',
      }))
      const nextTracksLink = rawData.data.next_href
      return { newTracks, nextTracksLink }
    }
    throw new Error('could not request tracks 1')
  } catch (error) {
    throw new Error('could not request tracks 2')
  }
}
