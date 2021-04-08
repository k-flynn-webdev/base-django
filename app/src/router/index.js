import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '../views/home.vue'
const isAuthenticated = () => store.state.user.isLoggedIn
// import userRoutes from './user'
// import itemRoutes from './items'
// import Tracks from '../views/trackListView.vue'
// import Tags from '../views/Tags.vue'
// import isAdminAPI from '@/services/isAdmin';
// import { ALL } from '../constants'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Mini-Tracks' },
      beforeEnter(to, from, next) {
        if (isAuthenticated()) {
          next({ name: 'track' })
        }
        next()
      },
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register' },
      component: () => import(/* webpackChunkName: "register" */ '../views/register')
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login' },
      component: () => import(/* webpackChunkName: "login" */ '../views/login')
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import(/* webpackChunkName: "user" */ '../views/User')
    // },
    {
      path: '/track',
      name: 'track',
      meta: { title: 'Mini-Tracks' },
      beforeEnter(to, from, next) {
        if (!isAuthenticated()) {
          next({ name: 'home' })
        }
        next()
      },
      component: () => import(/* webpackChunkName: "trackListView" */ '../views/trackListView')
    },
    {
      path: '/tag',
      name: 'tag-list',
      meta: { title: 'Mini-Tags' },
      beforeEnter(to, from, next) {
        if (!isAuthenticated()) {
          next({ name: 'home' })
        }
        next()
      },
      component: () => import(/* webpackChunkName: "tagListView" */ '../views/tagListView')
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      props: true,
      meta: { title: 'Mini-Tag' },
      beforeEnter(to, from, next) {
        if (!isAuthenticated()) {
          next({ name: 'home' })
        }
        next()
      },
      component: () => import(/* webpackChunkName: "tag" */ '../views/tagView')
    },
  // {
  //   path: ALL.HOME.route.path,
  //   name: ALL.HOME.route.name,
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: ALL.ADMIN.route.path,
  //   name: ALL.ADMIN.route.name,
  //   beforeEnter: (to, from, next) => {
  //     const success = () => next()
  //     const fail = () => next ({ name: ALL.HOME.route.name })
  //
  //     return isAdminAPI(success, fail)
  //   },
  //   component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  // },
  // ...userRoutes,
  // ...itemRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
