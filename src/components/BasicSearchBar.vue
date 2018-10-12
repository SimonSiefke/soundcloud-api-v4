<template>
  <form
    role="search"
    @submit.prevent="() => search($event.target.firstChild.value)">
    <input
      type="search"
      placeholder="search"
      autocomplete="off"
      aria-label="Search">
  </form>
</template>

<script lang="ts">
import { mapActions } from 'vuex'

export default {
  name: 'BasicSearchBar',
  methods: {
    ...mapActions('tracks', ['getTracks']),
    search(searchValue: string) {
      const query = { q: searchValue }
      // @ts-ignore
      this.getTracks(query)
    },
  },
}
</script>

<style lang="stylus" scoped>
form
  z-index 1 // be always above tracks, even when scrolling

input
  width 100%
  margin 0
  border none
  padding 10px
  background snow
</style>
