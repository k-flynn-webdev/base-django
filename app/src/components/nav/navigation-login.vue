<template>
  <div v-if="init.user">
    <div v-if="isLoggedIn"
         class="has-text-right">
      <div class="is-uppercase email">
        {{ userEmail }}
      </div>
      <a class="button is-success is-smaller"
         :href="logout.href">
        <cross-icon :class-items="'close'" />
      </a>
    </div>

    <a v-else
       :href="login.href">
      Login
    </a>
  </div>

  <div v-else>
    <span></span>
  </div>
</template>

<script>
import { LOGIN, LOGOUT, USER, CSRF } from '@/constants'
import crossIcon from '@/assets/cross'
import { genericErrMixin } from '@/plugins/genericErrPlugin'


export default {
  name: 'btn-login-logout',

  components: { crossIcon },

  mixins: [
    genericErrMixin
  ],

  created () {
    return this.initApp()
  },

  data () {
    return {
      login: LOGIN.views,
      logout: LOGOUT.views,
      init: {
        csrf: true,
        user: true,
      }
    }
  },

  computed: {
    userName () {
      return this.$store.state[USER.store].username
    },
    userEmail () {
      return this.$store.state[USER.store].email
    },
    isLoggedIn () {
      return !!this.userEmail
    }
  },
  methods: {
    initApp() {
      const allPromise = []

      if (this.init.csrf) {
        allPromise.push(this.initCsrf())
      }

      if (this.init.user) {
        allPromise.push(this.initUser())
      }

      if (!allPromise || !allPromise.length) return

      return new Promise.all(allPromise)
    },
    initUser() {
      return this.$store.dispatch(`${USER.store}/get`)
          .catch(err => this.handleError(err))
    },
    initCsrf() {
      return this.$store.dispatch(`${CSRF.store}/get`)
          .catch(err => this.handleError(err))
    }
  }
}
</script>
