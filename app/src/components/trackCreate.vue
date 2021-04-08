<template>
  <div class="track-create bubble">
    <form class="track"
          @reset.prevent="onReset"
          @submit.prevent="onSubmit">

      <div class="field">
        <div class="control">
          <input id="id-track-input"
                 v-model="form.track"
                 class="input"
                 type="text"
                 required
                 placeholder="..What happened?"
                 @input="$store.dispatch('api/getCSRF')"
          />
        </div>
      </div>

      <div class="track-create__tag">
        <div class="track-create__tag__row">

          <tag-item v-for="tag in form.tags"
                    show-close
                    :key="tag.value"
                    :tag="tag"
                    :allow-url="false"
                    :allow-info="false"
                    @click="onTagRemove(tag)"
          />

          <input
              type="text"
              placeholder="..#Tags"
              class="track-create__tag__row-text input"
              v-model="tagInput"
              @blur="onTagAdd"
              @input="$store.dispatch('api/getCSRF')"
              @keydown.32="onTagAdd"
              @keydown.188="onTagAdd"
              @keydown.enter="onTagAdd"
              @keydown.delete="onTagRemove"
          />

        </div>

        <button class="button-add bubble has-fill-white icon ml-1"
                :class="{ 'is-loading': loading }"
                :disabled="loading || !isValid"
                type="submit">
          <right-icon />
        </button>

      </div>

    </form>

    <tags-recent @tagAdd="onTagAdd" />

  </div>
</template>

<script>
import { TRACK } from '@/constants'
import rightIcon from '@/assets/right'
import tagItem from "@/components/tagItem";
import tagsRecent from "@/components/tagsRecent";
import { genericErrMixin } from '@/plugins/genericErrPlugin'

export default {
  name: 'track-create',

  mixins: [
    genericErrMixin
  ],

  components: {
    rightIcon,
    tagItem,
    tagsRecent
  },

  data () {
    return {
      tagInput: '',
      loading: false,
      form: {
        track: '',
        tags: []
      }
    }
  },

  computed: {
    isValid () {
      return TRACK.isValid(this.form)
    }
  },

  created () {
    this.onReset()
  },

  methods: {
    /**
     * Check if a tag already exists inside form.tags[x]
     * by value
     *
     * @param   {string}    value   string value to check for
     * @returns {boolean}           returns if the value already exists
     */
    isDuplicateTag (value) {
      for (let i = 0; i < this.form.tags.length; i++) {
        if (this.form.tags[i].value === value) return true
      }

      return false
    },
    /**
     * Add a Tag object or Tag value, no duplicates allowed
     *
     * @param {event|Tag}     input   object {event} or object {Tag}
     */
    onTagAdd (input) {
      if (input.id && input.value) {
        if (this.isDuplicateTag(input.value)) return
        this.form.tags.push(input)
        return
      }

      input.preventDefault()
      let val = input.target.value.trim()
      if (val.length > 0) {
        // no duplicates allowed
        if (this.isDuplicateTag(val)) return

        this.form.tags.push({ value: val })
        this.tagInput = ''
        input.target.value = ''
      }
    },
    /**
     * Remove a Tag object by matching value
     *
     * @param {object}    input    Tag to be removed
     */
    onTagRemove (input) {
      if (input.value) {
        for( let i = 0; i < this.form.tags.length; i++) {
          if (this.form.tags[i].value === input.value) {
            this.form.tags.splice(i, 1)
            return
          }
        }
      }

      // remove latest tag as event
      if (this.form.tags.length > 0 &&
          input &&
          input.target &&
          input.target.value.length < 1) {
        this.form.tags.splice(this.form.tags.length - 1, 1)
      }
    },
    /** Reset Form details */
    onReset () {
      this.tagInput = ''
      this.form = this.$options.data.call(this).form
    },
    /**
     * Submit Login details to API for authentication
     *
     * @returns {void|Promise<boolean>}
     */
    onSubmit () {
      if (this.loading) return
      if (!TRACK.isValid(this.form)) return

      this.loading = true

      return this.$store.dispatch('api/getCSRF')
      .then(() => {
        return this.$store.dispatch('track/post', {
          track: this.form.track,
          tags: this.form.tags.map(item => {
            if (item.id) { return item }
            return item.value
          })
        })
      })
      .then(() => this.onReset())
      .catch(err => this.handleError(err))
      .finally(() => this.loading = false)
    }
  }
}
</script>
