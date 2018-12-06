import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "PAGE__about" */ './views/About.vue'),
    },
    // {
    //   path: '/youtube',
    //   name: 'youtube',
    //   component: () =>
    //     import(/* webpackChunkName: "PAGE__youtube" */ './views/Youtube.vue'),
    // },
  ],
  mode: 'history',
})
