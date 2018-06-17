import { PlayerState } from '@/store/playerModule/types'

export const state: PlayerState = {
  loop: true,
  progress: 0,
}

export const player = {
  _player: null,
  get player() {
    return this._player // eslint-disable-line
  },
  set player(newPlayer) {
    this._player = newPlayer // eslint-disable-line
  },
} as any
