<template>
  <div class="level is-mobile mb-3">

    <router-link
        :to="{ name: 'home' }"
        class="title has-text-white level-item home">
      {{ pageTitle }}
    </router-link>

    <nav-login class="level-right" />
  </div>
</template>

<script>
import navLogin from '@/components/nav/navigation-login.vue'

export default {
  name: 'navigation-bar',

  components: {
    navLogin,
  },
  computed: {
    pageTitle () {
      if (this.$route &&
          this.$route.meta &&
          this.$route.meta.title) {
        return this.$route.meta.title
      }
      return ''
    }
  }
}
</script>
