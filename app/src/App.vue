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
        <logout class="level-right" />
      </div>

      <div class="columns is-centered">
        <router-view />
      </div>

    </section>

    <page-footer />

  </div>
</template>

<script>
import logout from '@/components/logout'
import pageFooter from '@/components/pageFooter'

export default {
  name: 'app',

  data () {
    return {
      title: 'Tracks'
    }
  },

  components: {
    logout,
    pageFooter
  },

  mounted () {
    return this.$store.dispatch('api/getCSRF')
  },

  methods: {
    onTitle (input) {
      this.title = input
    }
  }
}
</script>
