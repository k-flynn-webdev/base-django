import Vue from 'vue'
import { get } from 'lodash-es'
import { TRACK } from '@/constants';
import HTTP from '@/services/HttpService'


/**
 * Returns initial store state
 *
 * @returns {object}
 */
function initState () {
  return {
    trackList: [],
  }
}


const mutations = {
  /**
   * Set Track List
   *
   * @param {object}  state
   * @param {Track[]}   input
   */
  set: function (state, input) {
    Vue.set(state, 'trackList', input)
  },
  /**
   * Add a new Track
   *
   * @param {object}  state
   * @param {Track}   input
   */
  post: function (state, input) {
    state.trackList.unshift(input)
  },
  /**
   * Update a Track
   *
   * @param {object}  state
   * @param {Track}   input
   */
  patch: function (state, input) {
    for (let i = 0; i < state.trackList.length; i++) {
      if (state.trackList[i].id === input.id) {
        Vue.set(state.trackList, i, input)
        return
      }
    }
  },
  /**
   * Remove a Track
   *
   * @param {object}  state
   * @param {Track}   input
   */
  remove: function (state, input) {
    for (let i = 0; i < state.trackList.length; i++) {
      if (state.trackList[i].id === input.id) {
        Vue.delete(state.trackList, i)
        return
      }
    }
  },
}
const actions = {
  /**
   * Add a Track via API
   *
   * @param context
   * @param {object}    context
   * @param {Track}     input   track details
   * @return {Promise}
   */
  post: function (context, input) {
    return HTTP.post(TRACK.API.POST, input)
    .then(({ data }) => {
      context.commit('post', data.results)
      return data.results
    })
  },
  /**
   * Update a Track via API
   *
   * @param context
   * @param {object}    context
   * @param {Track}     input   track details
   * @return {Promise}
   */
  patch: function (context, input) {
    return HTTP.patch(`${TRACK.API.PATCH}/${input.id}`, input)
    .then(({ data }) => {
      context.commit('patch', data.results)
      return data.results
    })
  },
  /**
   * Remove a Track via API
   *
   * @param {object}    context
   * @param {Track}     input   track details
   * @return {Promise}
   */
  remove: function (context, input) {
    return HTTP.remove(`${TRACK.API.DELETE}/${input.id}`)
    .then(() => {
      context.commit('remove', input)
      return input
    })
  },
  /**
   * Get all Track List via API
   *
   * @param {object}      context
   * @param {Pagination}  input   pagination details
   * @return {Promise}
   */
  get: function (context, input) {
    return HTTP.get(TRACK.API.GET, input)
    .then(({ data }) => {
      context.commit('set', data.results)
      return data.results
    })
  },
  /**
   * Get a Track via API
   *
   * @param {object}      context
   * @param {Track}       input   track details
   * @return {Promise}
   */
  getById: function (context, input) {
    return HTTP.get(`${TRACK.API.GET}/${input.id}`)
    .then(({ data }) => {
      return data.results
    })
  },
}

export default {
  namespaced: true,
  state: initState(),
  mutations: mutations,
  actions: actions
}





/**
 * @typedef {object}    Pagination
 *
 * @property {number}   skip
 * @property {number}   total
 * @property {number}   per_page
 */