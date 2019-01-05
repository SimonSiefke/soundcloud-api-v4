<template>
<div >
    <button @click="playing=!playing" @keydown.enter="playing=!playing">{{playing?'pause':'play'}}</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      playing: false,
      audio: document.createElement('audio'),
    }
  },
  watch: {
    async playing(value) {
      if (value && this.audio.paused) {
        await this.audio.play()
      } else if (!value && !this.audio.paused) {
        await this.audio.pause()
      }
    },
  },
  async mounted() {
    this.audio.setAttribute('preload', 'none')
    this.audio.setAttribute('autoplay', '')
    this.audio.setAttribute('controls', '')
    this.audio.setAttribute(
      'src',
      `https://stream.radiohamburg.de/rhh-live/mp3-128/webplayer/8407e3d96ab3/?sabcsid=8407e3d96ab3&amp;0.5578027590384411&amp;context=fHA6LTE=?nocache=${Math.random()}`,
    )
    this.audio.addEventListener('playing', () => (this.playing = true))
    this.audio.addEventListener('paused', () => (this.playing = false))
    ;(document.querySelector('div') as HTMLDivElement).insertBefore(
      this.audio,
      null,
    )
  },
})
</script>
