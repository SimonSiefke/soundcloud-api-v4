<script>
import { Component, Vue } from 'vue-property-decorator'
import ScrollContainer from '../../../node_modules/@simon-siefke/vue-custom-scrollbar/dist/vue-custom-scrollbar.common.js'

export default Vue.extend({
  name: 'BasicScrollContainer',
  functional: true,
  components: {
    ScrollContainer,
  },
  render(h, { children }) {
    return h(
      ScrollContainer,
      {
        props: {
          position: 'relative',
        },
      },
      children,
    )
  },
})
</script>

<style src="../../../node_modules/@simon-siefke/vue-custom-scrollbar/dist/vue-custom-scrollbar.css">
</style>

<style lang="stylus" src="./style.global.styl">
</style>
