import { Track } from '@/types'
import { updateMediaSession } from '@/store/modules/playerModule/plugins/mediaSession'

export const hooks = {
  afterNext({ dispatch }: { dispatch: Function }, nextTrack: Track) {
    updateMediaSession({ dispatch }, nextTrack)
  },
}
