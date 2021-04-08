<template>
    <div class="track"
         :class="trackDateClass">

      <div class="track__body bubble"
           :class="{ 'has-tags': track.tags.length > 0 }">
        {{ track.value }}

        <div class="track__body__info is-size-7">
          <p class="track__body__info-date">
            {{ track | itemDateAbr }}
          </p>
          <p class="track__body__info-time">
            {{ track | itemTimeAbr }}
          </p>
        </div>

      </div>

      <div class="tag-list">
        <div class="tag-list-content">
          <tag-item v-for="tag in track.tags"
                    :key="tag.id"
                    :tag="tag" />
        </div>
      </div>

    </div>
</template>

<script>
import { TRACK, TAG } from '@/constants'
import tagItem from "@/components/tagItem";

export default {
  name: 'track-item',

  components: {
    tagItem
  },

  props: {
    track: {
      type: Object,
      default: TRACK.default()
    }
  },

  computed: {
    trackDateClass () {
      const newDateInt = new Date(this.track.created_at).getDate()
      if (newDateInt % 2 === 1) { return 'is-light' }
      return null
    }
  }
}
</script>
