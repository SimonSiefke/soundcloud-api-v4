<template>
  <div class="layout--leftright">
    <div class="container">

    <Triangle   />
    <Triangle tilted-left="10px" />
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Triangle from './Triangle.vue'

export default Vue.extend({
  components: {
    Triangle,
  },
})
</script>


<style lang="stylus" scoped>
.v-triangle
  height auto
  left calc(50% + var(--x))
  position absolute
  stroke white
  stroke-width 1
  top calc(50% + var(--y))
  transform translate(-50%, -50%)
  width var(--size)
  --size 100px
  --x 0%
  --y 0%

.v-triangle:first-of-type
  --size 200px

.v-triangle:nth-of-type(2)
  --size 100px
</style>
