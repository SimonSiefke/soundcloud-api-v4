import { ActionTree } from 'vuex'
import { Api_GetTracks } from '@/api'
import { RootState } from '@/store/types'
import { TrackState } from '@/store/modules/trackModule/types'

export const actions: ActionTree<TrackState, RootState> = {
  /**
   * retrieve necessary information about the tracks,
   * e.g. streamingUrl, track covers, track artists
   */
  async getTracks({ commit }, options: any) {
    const { newTracks, nextTracksLink } = await Api_GetTracks(options)
    commit('setTracks', newTracks)
    commit('setNextTracksLink', nextTracksLink)
  },
}
