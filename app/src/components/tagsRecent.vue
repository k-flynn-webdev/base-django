<template>
  <div class="tag-list recent">
    <div class="tag-list-content">
      <span class="label is-size-6 is-clickable"
            @click="getRecentTags">
        Recent:
      </span>
      <tag-item v-for="item in recentTags"
                :key="item.id"
                :tag="item"
                :allow-url="false"
                :allow-info="false"
                @click="onClick(item)" />
    </div>
  </div>
</template>

<script>
import HttpService from "@/services/HttpService";
import tagItem from "@/components/tagItem";
import { TAG } from '@/constants'
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'tags-recent',

  mixins: [
    genericErrMixin
  ],

  components: {
    tagItem
  },

  data () {
    return {
      recentTags: []
    }
  },

  created () {
    return this.getRecentTags()
  },

  methods: {
    getRecentTags () {
      return HttpService.get(TAG.API.GET, { params: { limit: 5 } })
      .then(({ data }) => {
        this.recentTags = data.results
      })
      .catch(err => this.handleError(err))
    },
    onClick(item) {
      this.$emit('tagAdd', item)
      for(let i = 0, max = this.recentTags.length; i < max; i++) {
        if (this.recentTags[i].value === item.value) {
          this.recentTags.splice( i, 1)
          return
        }
      }
    }
  }
}
</script>
