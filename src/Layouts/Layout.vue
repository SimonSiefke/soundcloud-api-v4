<template >
  <div>
    <TestComponent/>
    <BasicAddToHomeScreen/>
    <BasicSearchBar />
    <!-- using tabindex -1 to not focus the main element but the elements inside of it -->
    <main tabindex="-1">
      <BasicTrackList
        :tracks="tracks"
        :current-track="currentTrack"
      />
    </main>
    <footer>
      <chromecast-wrapper />
      <BasicNavigation :track="currentTrack" />
      <BasicToggleFullscreen :track="currentTrack" />
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

// const loadFonts = () =>
//   import(/* webpackChunkName: 'loadFonts' */ '@/styleUtils/loadFonts')

const BasicNavigation = () =>
  import(/* webpackChunkName: 'component-navigation' */ '@/components/BasicNavigation.vue')
const BasicToggleFullscreen = () =>
  import(/* webpackChunkName: 'component-navigation' */ '@/components/BasicToggleFullscreen.vue')

const ChromecastWrapper = () =>
  import(/* webpackChunkName: 'component-chromecast-wrapper' */ '@/components/ChromecastWrapper.vue')

const BasicAddToHomeScreen = () =>
  import(/* webpackChunkName: 'component-chromecast-wrapper' */ '@/components/BasicAddToHomeScreen.vue')

@Component({
  name: 'Layout',
  components: {
    BasicTrackList,
    BasicSearchBar,
    BasicNavigation,
    BasicToggleFullscreen,
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
main
  overflow-y auto
  flex 1

footer
  z-index 1
</style>
