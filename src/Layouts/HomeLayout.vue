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
      <BasicNavigation :track="currentTrack" />
      <BasicTogglePlay :track="currentTrack" />
      <BasicAddToHomeScreen/>
    </footer>
  </div>
</template>

<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import BasicTrackList from '@/components/BasicTrackList.vue'
import BasicSearchBar from '@/components/BasicSearchBar/Index.vue'
import { Track } from '@/types'
import IdleComponent from 'vue-idle-component'

const BasicScrollContainer = () =>
  import(/* webpackChunkName: 'COMPONENT__scroll-container' */ '@/components/BasicScrollContainer/Index.vue')

const BasicNavigation = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/BasicNavigation/Index.vue')
const BasicTogglePlay = () =>
  import(/* webpackChunkName: 'COMPONENT__navigation' */ '@/components/BasicTogglePlay/Index.vue')

const ChromecastWrapper = () =>
  import(/* webpackChunkName: 'COMPONENT__chromecast-wrapper' */ '@/components/ChromecastWrapper/Index.vue')

const BasicAddToHomeScreen = () =>
  import(/* webpackChunkName: 'COMPONENT__add-to-homescreen' */ '@/components/BasicAddToHomeScreen/Index.vue')

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
  private progress!: number
  @State('playingIndex', {
    namespace: 'tracks',
  })
  private playingIndex!: number
  @State('tracks', {
    namespace: 'tracks',
  })
  private tracks!: Track[]
  @Getter('tracks/currentTrack') private currentTrack!: Track

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

  @Action('player/togglePlay') togglePlay!: () => void
}
</script>

<style lang="stylus" scoped>
.layout--mobile
  display grid
  grid-template 'header' 'main' 'footer'
  grid-template-columns 1fr
  grid-template-rows auto 1fr auto

header
  grid-area header

main
  display flex
  flex 1
  grid-area main
  overflow hidden
  position relative

footer
  grid-area footer
  z-index 1
</style>
