import { Track } from '@/types'
import axios from 'axios'
import querystring from 'querystring'

/**
 * retrieve necessary information about the tracks,
 * e.g. streamingUrl, track covers, track artists
 */
export async function Api_GetTracks(options: object = {}): Promise<{ [key: string]: any }> {
  const defaultRequestOptions = {
    limit: 60, // max number of tracks per request
    linked_partitioning: 1, // send 1 link with the next bulk of tracks
    q: 'odesza', // query parameter
    client_id: process.env.VUE_APP_SOUNDCLOUD_CLIENT_ID,
  }
  const mergedOptions = { ...defaultRequestOptions, ...options }
  try {
    const rawData = await axios.get(`https://api.soundcloud.com/tracks?${querystring.stringify(mergedOptions)}`)

    if (rawData) {
      const newTracks = rawData.data.collection.map((track: any, index: number): Track => ({
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
        playing: false,
        index,
        loading: false,
      }))
      const nextTracksLink = rawData.data.next_href
      return { newTracks, nextTracksLink }
    }
    throw new Error('could not request tracks')
  } catch (error) {
    throw new Error('could not request tracks')
  }
}
