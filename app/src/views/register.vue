<template>
  <div class="column is-5-tablet is-4-desktop is-3-widescreen register">
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
        <label for="id-password" class="label">
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

      <router-link :to="{ name: 'login' }">
        Have an account?
      </router-link>

      <div class="field mt-5">
        <button class="button is-success">
          {{ loading ? '...' : 'Register' }}
        </button>
      </div>

    </form>
  </div>

</template>

<script>
import { REGISTER } from '@/constants'
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'register',

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

  created () {
    this.resetForm()
  },

  methods: {
    /** Reset Register details */
    resetForm () {
      this.form.email = 'flynny85@gmail.com'
      this.form.password = 'password'
    },
    /**
     * Submit Login details to API for authentication
     *
     * @returns {void|Promise<boolean>}
     */
    submit () {
      if (this.loading) return
      if (!REGISTER.isValid(this.form)) return

      this.loading = true

      return this.$store.dispatch('api/getCSRF')
      .then(() => {
        return this.$store.dispatch('user/register', {
          email: this.form.email,
          password: this.form.password
        })
      })
      .then(() => {
        this.resetForm()
        this.$nextTick(() => {
          this.$router.push({ name: 'home' })
        })
      })
      .catch(err => this.handleError(err))
      .finally(() => this.loading = false)
    }
  }
}
</script>
