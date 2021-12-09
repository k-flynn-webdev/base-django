<template>
  <div class="level is-mobile mb-3">

    <router-link
        :to="{ name: 'home' }"
        class="title has-text-white level-item home">
      {{ $route.meta.title }}
    </router-link>

    <nav-login class="level-right" />
  </div>
</template>

<script>
import navLogin from '@/components/nav/navigation-login.vue'

export default {
  name: 'navigation',

  components: {
    navLogin,
  }
}
</script>
