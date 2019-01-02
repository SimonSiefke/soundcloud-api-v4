<template>
 <svg viewBox="0 15 100 85"  class="v-triangle"  :style="style" >
    <polygon points="50 15, 100 100, 0 100" />
</svg>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    upsideDown: {
      type: Boolean,
      default: false,
    },
    tiltedLeft: {
      type: String,
      default: '0',
    },
  },
  computed: {
    style(): object {
      if (this.tiltedLeft !== '0') {
        return {
          transform: `rotate(60deg) translateX(${this.tiltedLeft})`,
        }
      }
      return {}
    },
  },
})
</script>

<style lang="stylus" scoped>
.upside-down
  transform rotate(180deg)
  transform-origin center center
</style>
