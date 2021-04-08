<template>

  <div class="column is-11">

    <h2 class="title">Tag List</h2>

    <ul class="tag-list">
      <li v-for="tag in tagList"
           :key="tag.id"
           class="tag">
        {{ tag.value }}
      </li>
    </ul>

  </div>

</template>

<script>
import { TAG, USER } from '@/constants'
import HttpService from "@/services/HttpService";
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'tag-list-view',

  mixins: [
    genericErrMixin
  ],

  data () {
    return {
      tagList: null
    }
  },

  mounted () {
    return this.getTagList()
  },

  methods: {
    /**
     * Return All Tags used by User
     *
     * @returns {Promise<void>}
     */
    getTagList () {
      return HttpService.get(`${TAG.API.GET}/`)
        .then(({ data }) => {
          this.tagList = data.results
        })
        .catch(err => this.handleError(err))
    },
  }
}
</script>
