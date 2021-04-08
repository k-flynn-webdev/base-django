import { CSRF } from '@/constants';
import HTTP from '@/services/HttpService'

const TIME_CHECK = 30 * 60 * 1000; /* ms */


/**
 * Returns initial store state
 *
 * @returns {object}
 */
function initState () {
  return {
    CSRF_requested_at: null,
  }
}


const actions = {
  /**
   * Get CSRF token via API
   *
   *  A helper method to try keep requests
   *  legal via a csrf token without spamming the API
   *
   * @param   context
   * @param   {object}    context
   * @return  {Promise}   201 no content
   */
  getCSRF: function (context) {
    // tbd if this is any good todo:
    if ((context.state.CSRF_requested_at &&
      (new Date() - context.state.CSRF_requested_at) < TIME_CHECK)) {
      return Promise.resolve(true)
    }

    return HTTP.get(CSRF.API.GET)
    .then(() => {
      context.state.CSRF_requested_at = new Date()
      return true
    })
  }
}

export default {
  namespaced: true,
  state: initState(),
  actions: actions
}