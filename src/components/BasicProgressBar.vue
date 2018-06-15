<template>
  <div class="progress-wrapper">
    <div class="progress" :style="{width: `${this.progress.value}%`}"></div>
  </div>
</template>

<script>
export default {
  inject: ['progress'],
}
</script>
<style lang="stylus" scoped>
.progress-wrapper
  position absolute
  width 100%
  bottom 0
  height 2px

.progress
  height 100%
  background var(--user-name-color)
</style>
