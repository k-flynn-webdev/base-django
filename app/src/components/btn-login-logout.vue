<template>
  <div class="">
    <div v-if="isLoggedIn">
      <span class="mr-2">{{ userName }}</span>
      <a :href="url_logout" class="button is-success is-smaller">
        <cross-icon :class-items="'close'" />
      </a>
    </div>

    <a :href="url_login" v-else >
      Login
    </a>
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

  mounted () {
    return this.$store.dispatch(`${CSRF.store}/get`)
    .then(() => this.$store.dispatch(`${USER.store}/get`))
    .catch(err => this.handleError(err))
  },

  data () {
    return {
      loading: false,
      url_login: LOGIN.route.path,
      url_logout: LOGOUT.route.path,
    }
  },

  computed: {
    userName () {
      return this.$store.state[USER.store].username
    },
    isLoggedIn () {
      return !!this.$store.state[USER.store].email
    }
  }
}
</script>
