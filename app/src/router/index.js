import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoutes from './user'

import Home from '../views/home.vue'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'home',
      meta: { title: '' },
      component: Home
    },
  ...userRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
