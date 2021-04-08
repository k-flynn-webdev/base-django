<template>

  <div class="column is-11">

    <track-create />
    <track-list v-if="isLoggedIn" />
    <div v-else>Not logged in</div>

  </div>

</template>

<script>
import trackCreate from "@/components/trackCreate";
import trackList from "@/components/trackList";
import { USER } from '@/constants'

export default {
  name: 'track-list-view',

  components: {
    trackCreate,
    trackList
  },

  computed: {
    isLoggedIn () {
      return this.$store.state[USER.store].isLoggedIn
    }
  },
}
</script>
