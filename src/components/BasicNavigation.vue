<template>
  <nav>
    <basic-progress-bar />
  </nav>
</template>

<script>
import BasicProgressBar from '@/components/BasicProgressBar.vue'

export default {
  name: 'BasicNavigation',
  components: {
    BasicProgressBar,
  },
  created() {
    console.log('navigation loaded')
  },
}
</script>

<style lang="stylus" scoped>
nav
  box-sizing border-box
  position fixed
  z-index 3
  display flex
  width 100%
  bottom 0
  height var(--navigation-height)
  background black
</style>
