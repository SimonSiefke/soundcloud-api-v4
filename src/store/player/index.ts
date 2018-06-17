import * as actions from './actions'
import * as mutations from './mutations'
import { State } from './types'

const state: State = {
  loop: true,
  progress: 0,
  player: null,
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
