<template>
    <div class="track-list">

      <template v-if="!loading && getTrackList">
        <track-item v-for="item in trackList"
                    :key="item.id"
                    :track="item" />
      </template>

      <div v-else-if="loading">
        Loading
      </div>

      <div v-else-if="!loading && trackList.length < 1">
        No Tracks
      </div>

    </div>
</template>

<script>
import { TRACK } from '@/constants'
import trackItem from "@/components/trackItem";
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'track-list',

  mixins: [
    genericErrMixin
  ],

  components: {
    trackItem
  },

  data () {
    return {
      loading: false,
    }
  },

  computed: {
    trackList () {
      return this.$store.state[TRACK.store].trackList
    }
  },

  created () {
    return this.getTrackList()
  },

  methods: {
    /** Ensure API returns track list on init */
    getTrackList () {
      if (this.loading) return

      this.loading = true

      return this.$store.dispatch('track/get')
          .catch(err => this.handleError(err))
          .finally(() => this.loading = false)
    },
  }
}
</script>
