<template>
  <div class="">
    <div v-if="isLoggedIn">
      <span class="mr-2">{{ userName }}</span>
      <button class="button is-success is-smaller"
              @click="onSubmit">
        <cross-icon :class-items="'close'" />
      </button>
    </div>

    <router-link v-else
                 :to="{ name: 'login' }">
      Login
    </router-link>
  </div>
</template>

<script>
import { USER } from '@/constants'
import crossIcon from '@/assets/cross'
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'Logout',

  components: { crossIcon },

  mixins: [
    genericErrMixin
  ],

  data () {
    return {
      loading: false,
    }
  },

  computed: {
    userName () {
      return this.$store.state[USER.store].user.name
    },
    isLoggedIn () {
      return this.$store.state[USER.store].isLoggedIn
    }
  },

  methods: {
    /**
     * Submit Logout details to API for de-authentication
     *
     * @returns {void|Promise<boolean>}
     */
    onSubmit () {
      if (this.loading) return

      this.loading = true

      return this.$store.dispatch('api/getCSRF')
      .then(() => this.$store.dispatch('user/logout'))
      .then(() => this.$router.push({ name: 'home' }))
      .catch(err => this.handleError(err))
      .finally(() => this.loading = false)
    }
  }
}
</script>
