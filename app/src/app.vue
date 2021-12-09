<template>
  <div id="app"
       class="p-1"
       :class="appNameLong">

    <message />

    <div class="container">

      <navBar />

      <div class="columns is-centered">
        <router-view />
      </div>

    </div>

    <page-footer />

  </div>
</template>

<script>
import pageFooter from '@/components/page-footer'
import navBar from '@/components/nav/navigation-bar'

export default {
  name: 'app',

  components: {
    navBar,
    pageFooter
  },

  computed: {
    appNameLong () {
      return process.env.VUE_APP_NAME_FULL || 'BASE'
    }
  },

}
</script>
