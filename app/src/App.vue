<template>
  <div id="app"
       class="mini-track p-1">

    <message />

    <section class="container">

      <div class="level is-mobile mb-3">
        <router-link
            :to="{ name: 'home' }"
            class="title has-text-white level-item">
          {{ $route.meta.title }}
        </router-link>
        <btn-login-logout class="level-right" />
      </div>

      <div class="columns is-centered">
        <router-view />
      </div>

    </section>

    <page-footer />

  </div>
</template>

<script>
import btnLoginLogout from '@/components/btn-login-logout'
import pageFooter from '@/components/pageFooter'

export default {
  name: 'app',

  data () {
    return {
      title: 'Tracks'
    }
  },

  components: {
    btnLoginLogout,
    pageFooter
  },

  methods: {
    onTitle (input) {
      this.title = input
    }
  }
}
</script>
