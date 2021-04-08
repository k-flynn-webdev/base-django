<template>

  <div class="column is-11">

    <h2 class="title">Tag Detail</h2>

    <ul v-for="prop in tagProperties"
         :key="prop"
         class="tag-detail">
      <label class="label is-inline-block mr-1">{{ prop }}</label>
      <span class="ml-1 detail">{{ detail[prop] }}</span>
    </ul>

  </div>

</template>

<script>
import { TAG, USER } from '@/constants'
import HttpService from "@/services/HttpService";
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'tag-view',

  mixins: [
    genericErrMixin
  ],

  data () {
    return {
      detail: null
    }
  },

  computed: {
    tagProperties () {
      if (!this.detail) return []
      return Object.keys(this.detail)
    }
  },

  props: {
    /** Tag ID as <String> */
    tag: {
      type: String,
      default: ''
    }
  },

  mounted () {
    return this.getTagDetail()
  },

  methods: {
    /**
     * Return Tag details
     *
     * @returns {void|Promise}
     */
    getTagDetail () {
      if (!this.tag) return
      return HttpService.get(`${TAG.API.GET}/${this.tag}`)
          .then(({ data }) => {
            this.detail = data.results
          })
          .catch(err => this.handleError(err))
    },
  }
}
</script>
