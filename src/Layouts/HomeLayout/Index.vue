<template >
  <div class="layout--mobile">
    <header>
      <BasicSearchBar />
    </header>
    <main>
      <BasicScrollContainer>
        <BasicTrackList :tracks="tracks" :current-track="currentTrack" />
      </BasicScrollContainer>
    </main>
    <footer>
      <ChromecastWrapper />
      <BasicNavigation />
      <BasicTogglePlay :state="state" :pause="_togglePlay" :play="_togglePlay" />
      <BasicAddToHomeScreen/>
    </footer>
  </div>
</template>

<script lang="ts" >
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import BasicTrackList from '@/components/basic/BasicTrackList/BasicTrackList.vue'
import BasicSearchBar from '@/components/basic/BasicSearchBar/BasicSearchBar.vue'
import IdleComponent from 'vue-idle-component'
import { Track } from '@/types'

const BasicScrollContainer = () =>
  import(/* webpackChunkName: 'COMPONENT__scroll-container' */ '@/components/basic/BasicScrollContainer/BasicScrollContainer.vue')

const BasicNavigation = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/basic/BasicNavigation/Index.vue')
const BasicTogglePlay = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/basic/BasicTogglePlay/BasicTogglePlay.vue')

const ChromecastWrapper = () =>
  import(/* webpackChunkName: 'COMPONENT__chromecast-wrapper' */ '@/components/basic/ChromecastWrapper/ChromecastWrapper.vue')

const BasicAddToHomeScreen = () =>
  import(/* webpackChunkName: 'COMPONENT__add-to-homescreen' */ '@/components/basic/BasicAddToHomeScreen/BasicAddToHomeScreen.vue')

@Component({
  name: 'Layout',
  components: {
    BasicTrackList,
    BasicSearchBar,
    BasicNavigation,
    BasicTogglePlay,
    BasicScrollContainer,
    BasicAddToHomeScreen: IdleComponent(BasicAddToHomeScreen),
    ChromecastWrapper: IdleComponent(ChromecastWrapper),
  },
})
export default class Layout extends Vue {
  // Data
  chromeCastAvailable = null

  // Computed
  @State('progress', {
    namespace: 'player',
  })
  progress!: number

  @State('playingIndex', {
    namespace: 'tracks',
  })
  playingIndex!: number
  @State('tracks', {
    namespace: 'tracks',
  })
  tracks!: Track[]
  @Getter('tracks/currentTrack') currentTrack!: Track

  get state() {
    if (!this.currentTrack) {
      return 'loading'
    } else if (['IDLE', 'PAUSED'].includes(this.currentTrack.audioState)) {
      return 'paused'
    } else if (this.currentTrack.audioState === 'PLAYING') {
      return 'playing'
    }
    return 'loading'
  }

  /***********
   * Created *
   ***********/
  created() {
    // loadFonts()
    this.getTracks()
  }

  /***********
   * Mounted *
   ***********/
  mounted() {
    // @ts-ignore
    // eslint-disable-next-line
    window.__onGCastApiAvailable = (isAvailable:boolean) => {
      // @ts-ignore
      this.chromeCastAvailable = isAvailable
      console.log('init chrome cast')
      if (!isAvailable) {
        console.log('cast not isAvailable')
      }
    }
  }

  /***********
   * Methods *
   ***********/
  @Action('tracks/getTracks') getTracks!: () => void

  @Action('player/togglePlay') togglePlay!: (track: Track) => void

  _togglePlay() {
    this.togglePlay(this.currentTrack)
  }
}
</script>

<style lang="stylus" scoped src="./style.scoped.styl">
</style>
