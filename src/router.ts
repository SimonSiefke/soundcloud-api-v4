import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "PAGE__home" */ './views/Home.vue'),
    },
    {
      path: '/about',
      component: () =>
        import(/* webpackChunkName: "PAGE__about" */ './views/About.vue'),
    },
    {
      path: '/youtube',
      component: () =>
        import(/* webpackChunkName: "PAGE__youtube" */ './views/Youtube.vue'),
    },
    {
      path: '/layouts/youtube',
      component: () =>
        import(/* webpackChunkName: "PAGE__LAYOUT__experimental" */ './views/layouts/Youtube.vue'),
    },
    {
      path: '/layouts/triangle',
      component: () =>
        import(/* webpackChunkName: "PAGE__LAYOUT__experimental" */ './views/layouts/Triangle/Index.vue'),
    },
    {
      path: '/layouts/rectangle',
      component: () =>
        import(/* webpackChunkName: "PAGE__LAYOUT__experimental" */ './views/layouts/Rectangle/Index.vue'),
    },
    {
      path: '/radio',
      component: () =>
        import(/* webpackChunkName: "PAGE__RADIO__RADIOHAMBURG" */ './views/radio/RadioHamburg/Index.vue'),
    },
  ],
  mode: 'history',
})
