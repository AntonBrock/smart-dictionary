import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'smart-dictionary',
      path: '/',
      component: require('@/pages/IndexPage').default
    },
  ]
});

export default router;