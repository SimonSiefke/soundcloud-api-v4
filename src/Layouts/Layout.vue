<template >
  <div class="layout-mobile">
    <header>
      <BasicSearchBar />
    </header>
    <main>
      <basic-scroll-container>
        <BasicTrackList
          :tracks="tracks"
          :current-track="currentTrack"
        />
      </basic-scroll-container>
    </main>
    <footer>
      <chromecast-wrapper />
      <BasicNavigation :track="currentTrack" />
      <BasicToggleFullscreen :track="currentTrack" />
      <BasicAddToHomeScreen/>
    </footer>
  </div>
</template>

<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import BasicTrackList from '@/components/BasicTrackList.vue'
import BasicSearchBar from '@/components/BasicSearchBar.vue'
import { Track } from '@/types'
import IdleComponent from '@/components/BasicIdleComponent'

const BasicScrollContainer = () =>
  import(/* webpackChunkName: 'COMPONENT__scroll-container' */ '@/components/BasicScrollContainer.vue')

const BasicNavigation = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/BasicNavigation.vue')
const BasicToggleFullscreen = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/BasicToggleFullscreen.vue')

const ChromecastWrapper = () =>
  import(/* webpackChunkName: 'COMPONENT__chromecast-wrapper' */ '@/components/ChromecastWrapper.vue')

const BasicAddToHomeScreen = () =>
  import(/* webpackChunkName: 'COMPONENT__chromecast-wrapper' */ '@/components/BasicAddToHomeScreen.vue')

@Component({
  name: 'Layout',
  components: {
    BasicTrackList,
    BasicSearchBar,
    BasicNavigation,
    BasicToggleFullscreen,
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
  private progress!: number
  @State('playingIndex', {
    namespace: 'tracks',
  })
  private playingIndex!: number
  @State('tracks', {
    namespace: 'tracks',
  })
  private tracks!: Track[]
  @Getter('tracks/currentTrack')
  private currentTrack!: Track

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
  @Action('tracks/getTracks')
  getTracks!: () => void

  @Action('player/togglePlay')
  togglePlay!: () => void
}
</script>

<style lang="stylus" scoped>
.layout-mobile
  display grid
  grid-template-areas 'header' 'main' 'footer'
  grid-template-rows auto 1fr auto

header
  grid-area header

main
  overflow hidden
  position relative
  display flex
  flex 1
  grid-area main

footer
  z-index 1
  grid-area footer
</style>
