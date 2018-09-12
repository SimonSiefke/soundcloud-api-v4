import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { AudioModuleState } from '@/store/modules/audioModule/types'
import { actions } from '@/store/modules/audioModule/actions'
import { state } from '@/store/modules/audioModule/state'

const audioModule: Module<AudioModuleState, RootState> = {
  state,
  actions,
  namespaced: true,
}

export default audioModule
