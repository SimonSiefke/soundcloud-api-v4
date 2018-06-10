import { Api_GetTracks } from '@/api'

/**
 * retrieve necessary information about the tracks,
 * e.g. streamingUrl, track covers, track artists
 */
export async function getTracks({ commit }: { commit: any }, options: any) {
  const { newTracks, nextTracksLink } = await Api_GetTracks(options)
  commit('setTracks', newTracks)
  commit('setNextTracksLink', nextTracksLink)
  // commit('resetRecentlyPlayedTracks')
}
