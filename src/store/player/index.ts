import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  loop: true,
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
