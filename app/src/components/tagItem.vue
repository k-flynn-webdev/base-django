<template>
  <div class="tag bubble is-clickable"
       :class="{ 'show-close' : showClose }"
       @click="onClick">
    <span class="value">{{ tag.value }}</span>
    <div v-if="allowInfo"
         class="tag-info">
      <div>created: {{ tag | itemDate }}</div>
      <div>used: {{ tag.count_all }}</div>
    </div>
    <cross-icon v-if="showClose" />
  </div>
</template>

<script>
import { TAG } from '@/constants'
import crossIcon from '@/assets/cross'

export default {
  name: 'tag-item',

  components: { crossIcon },

  props: {
    tag: {
      type: Object,
      default: TAG.default()
    },
    allowUrl : {
      type: Boolean,
      default: true,
    },
    allowInfo : {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick () {
      if (!this.allowUrl) {
        return this.$emit('click', this.tag)
      }

      this.$router.push({
        name: TAG.route.name,
        params: { tag: this.tag.value }
      })
    }
  }
}
</script>
