<template>
  <div id="app"
       class="p-1"
       :class="appName">

    <message />

    <div class="container">

      <navigation />

      <div class="columns is-centered">
        <router-view />
      </div>

    </div>

    <page-footer />

  </div>
</template>

<script>
import navigation from '@/components/navigation'
import pageFooter from '@/components/pageFooter'

export default {
  name: 'app',

  components: {
    navigation,
    pageFooter
  },

  computed: {
    appName () { return process.env.APP_NAME_SHORT || 'BASE' }
  },

}
</script>
