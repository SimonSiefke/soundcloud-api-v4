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
    {
      path: '/youtube',
      name: 'youtube',
      component: () =>
        import(/* webpackChunkName: "PAGE__youtube" */ './views/Youtube.vue'),
    },
    {
      path: '/layouts/youtube',
      name: 'youtube2',
      component: () =>
        import(/* webpackChunkName: "PAGE__LAYOUT__experimental" */ './views/layouts/Youtube.vue'),
    },
    {
      path: '/layouts/triangle',
      name: 'triangle',
      component: () =>
        import(/* webpackChunkName: "PAGE__LAYOUT__experimental" */ './views/layouts/Triangle/Index.vue'),
    },
    {
      path: '/layouts/rectangle',
      name: 'rectangle',
      component: () =>
        import(/* webpackChunkName: "PAGE__LAYOUT__experimental" */ './views/layouts/Rectangle/Index.vue'),
    },
  ],
  mode: 'history',
})
