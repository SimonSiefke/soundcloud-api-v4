<template>
  <!--eslint-disable-next-line vue-a11y/click-events-have-key-events-->
  <button @click="login">sign in</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { Watch } from 'vue-property-decorator'

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyANjSiRyz79wxHkLIUewnJii6FxTxb_gy0',
  authDomain: 'r-auth-a3e43.firebaseapp.com',
  databaseURL: 'https://r-auth-a3e43.firebaseio.com',
  projectId: 'r-auth-a3e43',
  storageBucket: '',
  messagingSenderId: '671561893975',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      if (user) {
        resolve(user.uid)
      } else {
        resolve(null as any)
      }
    })
  })
}

@Component({
  name: 'SignIn',
})
export default class SignIn extends Vue {
  user: string | null = null
  playingState = null

  @Getter('tracks/currentTrack')
  private currentTrack!: any

  @Watch('currentTrack', { immediate: true, deep: true })
  private async updateDB() {
    if (this.user) {
      const userRef = db.collection('users').doc(this.user)
      await userRef.set({
        color: `red${Math.random()}`,
      })
    }
    console.log('update db')
  }

  async mounted() {
    // this.user = await getIdToken()
    // console.log(this.user)
    // this.playingState = await this.getData()
  }

  private async getData() {
    if (this.user) {
      const userRef = db.collection('users').doc(this.user)
      const data = (await userRef.get()).data()

      console.log('data')
      console.log(data)
      return data
    }
    return null
  }

  private async login() {
    if (this.user) {
      console.log('already')
      this.getData()
      return
    }
    const token = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    if (token && token.user) {
      const userRef = db.collection('users').doc(token.user.uid)

      await userRef.set({
        name: token.user.displayName,
        color: 'red',
      })

      // this.playingState = this.getData()
    }
  }
}
</script>

<style>
</style>
