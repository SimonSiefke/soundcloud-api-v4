<template>
  <div>
    <div
      id="bg-artwork"
      :style="{'background-image': `url(${url})`}"/>
    <div id="bg-layer"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Background extends Vue {
  @Prop() private url!: string
}
</script>
<style lang="stylus">
#bg-artwork
  background-position 50%
  background-repeat no-repeat
  background-size cover
  bottom -30px
  filter blur(40px)
  left -30px
  position fixed
  right -30px
  top -30px
  z-index 1

#bg-layer
  background-color #fff
  bottom 0
  left 0
  opacity 0.51
  position fixed
  right 0
  top 0
  z-index 2
</style>
