<template>
  <nav>
    <basic-progress-bar />
  </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import BasicProgressBar from '@/components/BasicProgressBar.vue'

@Component({
  name: 'BasicNavigation',
  components: {
    BasicProgressBar,
  },
})
export default class BasicNavigation extends Vue {}
</script>

<style lang="stylus" scoped>
nav
  box-sizing border-box
  display flex
  width 100%
  height var(--navigation-height)
  background var(--controlbar-background)
</style>
