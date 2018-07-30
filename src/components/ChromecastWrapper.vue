
<script lang="ts">
import Vue from 'vue'

const chromeCastSdk = import(/* webpackChunkName: 'chromecast-sdk' */'@/plugins/chromecast.ts')


export default Vue.extend({
  data() {
    return {
      chromeCastAvailable: null,
      chromecast: null as any,
    }
  },
  mounted() {
    // @ts-ignore
    // eslint-disable-next-line
    window.__onGCastApiAvailable = (isAvailable:boolean) => {
      // @ts-ignore
      this.chromeCastAvailable = isAvailable
      if (isAvailable) {
        console.log('is def')
        this.chromecast = () => import(/* webpackChunkName: 'component-chromecast' */ '@/components/Chromecast.vue')
      }
      // console.log('init chrome cast')
      if (!isAvailable) {
        console.log('cast not isAvailable')
      }
    }
  },
  render(h) {
    console.log(this.chromeCastAvailable)
    if (this.chromeCastAvailable) {
      console.log('render this', this.chromecast)
      return h(this.chromecast)
    }
    return h(null as any)
  },
})
</script>


<style scoped>
</style>
