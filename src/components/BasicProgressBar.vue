<template>
  <div class="progress-wrapper">
    <div
      :style="{width: `${progressPercent}%`}"
      class="progress"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { player } from '@/store/modules/audioModule/state'
import { mapGetters } from 'vuex'
import { AudioPlayer } from '@/store/modules/audioModule/types'

export default Vue.extend({
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
    player: {
      handler(newPlayer:AudioPlayer) {
        newPlayer.progressEventEmitter.on('progress', this.updateProgressPercent)
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.player.progressEventEmitter.removeListener(this.updateProgressPercent)
  },
  methods: {
    updateProgressPercent(progressInMilliseconds:number) {
      // @ts-ignore
      const trackDurationInMilliseconds = this.currentTrack.duration
      this.progressPercent = (progressInMilliseconds * 100000) / trackDurationInMilliseconds
    },
  },
})
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
