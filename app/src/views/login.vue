<template>
  <div class="column is-5-tablet is-4-desktop is-3-widescreen login">
    <form class="box"
          @submit.prevent="submit">
      <div class="field">
        <label for="id-email" class="label">
          Email
        </label>
        <div class="control">
          <input id="id-email"
                 v-model="form.email"
                 class="input"
                 type="email"
                 placeholder="e.g. bobsmith@gmail.com"
                 required
                 @input="$store.dispatch('api/getCSRF')"
          >
        </div>
      </div>
      <div class="field">
        <label for="id-password"
               class="label">
          Password
        </label>
        <div class="control">
          <input id="id-password"
                 v-model="form.password"
                 type="password"
                 placeholder="*******"
                 class="input"
                 required
                 @input="$store.dispatch('api/getCSRF')"
          >
        </div>
      </div>

      <router-link :to="{ name: 'register' }">
        Dont have an account?
      </router-link>

      <div class="field mt-5">
        <button class="button is-success">
          {{ loading ? '...' : 'Login' }}
        </button>
      </div>

    </form>
  </div>

</template>

<script>
import { LOGIN, TRACK } from '@/constants'
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'login',

  mixins: [
    genericErrMixin
  ],

  data () {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    /** Reset Register details */
    resetForm () {
      this.form.email = ''
      this.form.password = ''
    },
    /**
     * Submit Login details to API for authentication
     *
     * @returns {void|Promise<boolean>}
     */
    submit () {
      if (this.loading) return
      if (!LOGIN.isValid(this.form)) return

      this.loading = true

      return this.$store.dispatch('api/getCSRF')
      .then(() => {
        return this.$store.dispatch('user/login', {
          email: this.form.email,
          password: this.form.password })
      })
      .then(() => {
        this.resetForm()
        this.$router.push({ name: TRACK.route.name })
      })
      .catch(err => this.handleError(err))
      .finally(() => this.loading = false)
    }
  }
}
</script>
