<template>
  <nav>
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
  </nav>
</template>

<script>
export default {
  name: 'BasicNavigation',
  created() {
    console.log('navigation loaded')
  },
}
</script>

<style lang="stylus" scoped>
nav
  position fixed
  z-index 3
  display flex
  width 100%
  bottom 0
  height var(--navigation-height)
  background black
</style>
