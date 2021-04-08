import { VARS } from '@/constants'

/**
 * Get local storage of a user model
 */
function getCookie() {
  return localStorage.getItem(VARS.userLocal)
}

/**
 * Save raw User to local storage as a user model in JSON
 *
 * @param {user} input
 */
function saveCookie(input) {
  if (!input) {
    removeCookie()
    return
  }
  localStorage.setItem(VARS.userLocal, JSON.stringify(input))
}

/**
 * Remove local storage of a user model
 */
function removeCookie() {
  localStorage.removeItem(VARS.userLocal)
}

export default {
  get: getCookie,
  save: saveCookie,
  remove: removeCookie
}



// /**
//  * @typedef {object} Login
//  *
//  * @property {string}   strategy
//  * @property {string}   email
//  * @property {string}   password
//  */