<script>
import { Component, Vue } from 'vue-property-decorator'
import ScrollContainer from 'vue-styled-scrollbar'

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

<style src="vue-styled-scrollbar/dist/vue-styled-scrollbar.css">
</style>

<style lang="stylus" src="./style.global.styl">
</style>
