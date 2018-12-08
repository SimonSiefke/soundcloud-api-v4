<template>
  <div id="app-cover">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.3.1/css/solid.css">
    <background url="http://k003.kiwi6.com/hotlink/8msy543338/1.jpg"/>
    <div id="player">
      <div
        id="player-track"
        :class="{active}">
        <div id="album-name"/>
        <div id="track-name"/>
        <div id="track-time">
          <div id="current-time"/>
          <div id="track-length"/>
        </div>
        <div id="s-area">
          <div id="ins-time"/>
          <div id="s-hover"/>
          <div id="seek-bar"/>
        </div>
      </div>
      <div id="player-content">
        <div
          id="album-art"
          :class="{active}">
          <img
            src="http://k003.kiwi6.com/hotlink/8msy543338/1.jpg"
            class="active">

        </div>
        <div id="player-controls">
          <div class="control">
            <div
              id="play-previous"
              class="button">
              <i class="fas fa-backward"/>
            </div>
          </div>
          <div class="control">
            <div
              id="play-pause-button"
              class="button"
              @click="playPause">
              <i class="fas fa-play"/>
            </div>
          </div>
          <div class="control">
            <div
              id="play-next"
              class="button">
              <i class="fas fa-forward"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Background from './Background.vue'
import { IAudioShouldBeState, IAudioState, ITrack } from '@/types'

@Component({
  components: {
    Background,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private track!: ITrack

  audio = document.createElement('audio')
  active = false

  mounted() {
    this.audio.setAttribute(
      'src',
      'http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3',
    )
  }

  beforeDestroy() {
    this.audio.pause()
  }

  private playPause() {
    if (this.audio.paused) {
      this.audio.play()
      this.active = true
    } else {
      this.audio.pause()
      this.active = false
    }
  }
}
</script>

<style scoped lang="stylus">
*:focus
  outline none

body
  background-color #ffeff5
  font-family Helvetica, Arial
  margin 0

#app-cover
  height 100px
  left 0
  margin -4px auto
  position absolute
  right 0
  top 50%
  width 430px

#player
  height 100%
  position relative
  z-index 3

#player-track
  background-color #fff7f7
  border-radius 15px 15px 0 0
  height 80px
  left 15px
  padding 13px 22px 10px 184px
  position absolute
  right 15px
  top 0
  transition 0.3s ease top
  z-index 1

#player-track.active
  top -92px

#album-name
  color #54576f
  font-size 17px
  font-weight bold

#track-name
  color #acaebd
  font-size 13px
  margin 2px 0 13px 0

#track-time
  height 12px
  margin-bottom 3px
  overflow hidden

#current-time
  float left

#track-length
  float right

#current-time, #track-length
  background-color #ffe8ee
  border-radius 10px
  color transparent
  font-size 11px
  transition 0.3s ease all

#track-time.active #current-time, #track-time.active #track-length
  background-color transparent
  color #f86d92

#s-area, #seek-bar
  border-radius 4px
  height 4px
  position relative

#s-area
  background-color #ffe8ee
  cursor pointer

#ins-time
  border-radius 4px
  color #fff
  display none
  font-size 12px
  padding 5px 6px
  position absolute
  top -29px
  white-space pre

#s-hover
  bottom 0
  left 0
  opacity 0.2
  position absolute
  top 0
  z-index 2

#ins-time, #s-hover
  background-color #3b3d50

#seek-bar
  background-color #fd6d94
  bottom 0
  content ''
  left 0
  position absolute
  top 0
  transition 0.2s ease width
  width 0
  z-index 1

#player-content
  background-color #fff
  border-radius 15px
  box-shadow 0 30px 80px #656565
  height 100%
  position relative
  z-index 2

#album-art
  border-radius 50%
  box-shadow 0 0 0 10px #fff
  height 115px
  margin-left 40px
  overflow hidden
  position absolute
  top -40px
  transform rotateZ(0)
  transition 0.3s ease all
  width 115px

#album-art.active
  box-shadow 0 0 0 4px #fff7f7, 0 30px 50px -15px #afb7c1
  top -60px

#album-art:before
  background-color #d6dee7
  border-radius 50%
  box-shadow inset 0 0 0 2px #fff
  content ''
  height 20px
  left 0
  margin -10px auto 0 auto
  position absolute
  right 0
  top 50%
  width 20px
  z-index 2

#album-art img
  animation rotateAlbumArt 3s linear infinite forwards
  animation-play-state paused
  display block
  height 100%
  left 0
  opacity 0
  position absolute
  top 0
  width 100%
  z-index -1

#album-art img.active
  opacity 1
  z-index 1

#album-art.active img.active
  animation-play-state running
  z-index 1

@keyframes rotateAlbumArt
  0%
    transform rotateZ(0)

  100%
    transform rotateZ(360deg)

#buffer-box
  background-color rgba(255, 255, 255, 0.19)
  color #1f1f1f
  font-family Helvetica
  font-size 13px
  font-weight bold
  height 13px
  left 0
  line-height 1
  margin -12px auto 0 auto
  opacity 0
  padding 6px
  position absolute
  right 0
  text-align center
  top 50%
  z-index 2

#album-art img, #buffer-box
  transition 0.1s linear all

#album-art.buffering img
  opacity 0.25

#album-art.buffering img.active
  filter blur(2px)
  opacity 0.8

#album-art.buffering #buffer-box
  opacity 1

#player-controls
  float right
  height 100%
  margin 0 5px 0 141px
  overflow hidden
  width 250px

.control
  float left
  padding 12px 0
  width 33.333%

.button
  background-color #fff
  border-radius 6px
  cursor pointer
  height 26px
  padding 25px
  width 26px

.button i
  color #d6dee7
  display block
  font-size 26px
  line-height 1
  text-align center

.button, .button i
  transition 0.2s ease all

.button:hover
  background-color #d6d6de

.button:hover i
  color #fff
</style>
