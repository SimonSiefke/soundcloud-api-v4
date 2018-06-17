<template>
  <div class="progress-wrapper">
    <div class="progress" :style="{width: `${this.progressPercent}%`}"></div>
  </div>
</template>

<script lang="ts">
import { player } from '@/store/playerModule/state'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      progressPercent: 0,
    }
  },
  computed: {
    ...mapGetters('tracks', ['currentTrack']),
    player() {
      return player.player
    },
  },
  watch: {
    player(newPlayer: any) {
      if (newPlayer !== null) {
        newPlayer.on('timeupdate', () => {
          // @ts-ignore
          const trackDurationInSeconds = this.currentTrack.duration / 1000
          const currentTimeInSeconds = newPlayer.audio.currentTime

          // @ts-ignore
          this.progressPercent = (currentTimeInSeconds / trackDurationInSeconds) * 100
        })
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.progress-wrapper
  position absolute
  width 100%
  bottom 0
  height 2px

.progress
  height 100%
  background var(--user-name-color)
</style>
