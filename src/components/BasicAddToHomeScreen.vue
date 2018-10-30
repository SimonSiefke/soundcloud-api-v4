<template>
  <button
    v-if="defferedPromp"
    @click="addToHomeScreen">add to homescreen</button>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'BasicAddToHomeScreen',
})
export default class BasicAddToHomeScreen extends Vue {
  /********
   * Data *
   ********/
  private deferredPrompt: Event | null = null

  /***********
   * Mounted *
   ***********/
  private mounted() {
    console.log('mounted')
    window.addEventListener('beforeinstallprompt', event => {
      console.log('before install')
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = event
    })
  }

  /***********
   * Methods *
   ***********/
  private addToHomeScreen() {
    // @ts-ignore
    this.deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    // @ts-ignore
    this.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      this.deferredPrompt = null
    })
  }
}
</script>

<style lang="stylus" scoped>
button
  position absolute
  width 100%
  top 0
  left 0
  background green
</style>
