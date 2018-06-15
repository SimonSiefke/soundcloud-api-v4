<template>
  <div class="progress-wrapper">
    <div class="progress" :style="{width:this.progress}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress2: 0,
    }
  },
  mounted() {
    setInterval(() => this.progress2 += 0.0005, 1)
  },
  computed: {
    progress() {
      return `${this.progress2 * 100}%`
    },
  },
}
</script>
<style lang="stylus" scoped>
.progress-wrapper
  position absolute
  width 100%
  bottom 0
  height 100%
  background black

.progress
  height 100%
  background var(--user-name-color)
</style>
