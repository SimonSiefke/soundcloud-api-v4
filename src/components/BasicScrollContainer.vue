<script>
import { Component, Vue } from 'vue-property-decorator'
import ScrollContainer from '../../node_modules/@simon-siefke/vue-custom-scrollbar/dist/vue-custom-scrollbar.common.js'

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

<style lang="stylus">
@import '../../node_modules/@simon-siefke/vue-custom-scrollbar/dist/vue-custom-scrollbar.css'

.v-simplebar
  flex 1

  .scrollbar
    width 8px

  .scrollbar-thumb
    border-radius 4px
    background var(--scrollbar-thumb-background)
    transition background 0.14s

    &:hover
      background var(--scrollbar-thumb-background-hover)

    &.dragging
      background var(--scrollbar-thumb-background-dragging)
</style>
