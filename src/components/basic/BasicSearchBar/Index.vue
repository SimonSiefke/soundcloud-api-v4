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
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component({
  name: 'BasicSearchBar',
})
export default class BasicSearchBar extends Vue {
  /***********
   * Methods *
   ***********/
  @Action('tracks/getTracks') private getTracks!: (query: { q: string }) => void

  search(searchValue: string) {
    if (searchValue) {
      const query = { q: searchValue }
      this.getTracks(query)
    }
  }
}
</script>

<style lang="stylus" scoped src="./style.scoped.styl">
</style>
