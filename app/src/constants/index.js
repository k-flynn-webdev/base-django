/**
 * @typedef {object}    ItemConfig    An object config to track a number of related things to an item
 *
 * @property {string}   value     api name
 * @property {string}   store     store name
 * @property {string}   route     route name
 * @property {object}   API       api endpoints {list, get, post, patch, delete}
 * @property {object}   views     view names and `props` required {list, view, create, update}
 * @property {function} isValid   check if a object is valid to create the item
 * @property {function} init      create a item
 *
 * @returns {Object}
 */


export const VARS = {
  name: process.env.APP_NAME_SHORT || 'BASE',
  pageCount: 20,
}

export const SORT_OPTIONS = {
  value: 'sort',
  store: null,
  direction: {
    asc: { label: 'asc', value: 1 },
    desc: { label: 'desc', value: -1 }
  },
  options: {
    created: { label: 'created', value: 'created_at' },
    updated: { label: 'updated', value: 'updated_at' },
    deleted: { label: 'deleted', value: 'deleted_at' },
  },
}

export const CSRF = {
  value: 'csrf',
  store: 'csrf',
  API: {
    GET: '/api/csrf/',
  }
}

/**
 * Check Email input is valid
 *
 * @param   {string}    input   Email string to check
 * @returns {boolean}
 */
function checkEmail (input) {
  return (input &&
      input.split('@').length > 1 &&
      input.split('.').length > 1)
}

/**
 * Check Password input is valid
 *
 * @param   {string}    input   Password string to check
 * @returns {boolean}
 */
function checkPassword (input) {
  return (input && input.length >= 8)
}

export const LOGIN = {
  value: 'login',
  views: { href: '/accounts/login/' },
}

export const REGISTER = {
  value: 'signup',
  views: { href: '/accounts/signup' },
}

export const LOGOUT = {
  value: 'logout',
  views: { href: '/accounts/logout/' },
}

/**
 * Used to get current logged in users details directly from the server API
 */
export const USER = {
  value: 'user',
  store: 'user',
  cookie: 'user-local',
  API: {
    GET: '/api/whoami/'
  }
}

export const ADMIN = {
  value: 'admin',
  views: { href: '/accounts/admin/' },
}


export const ALL = {
  VARS,
  CSRF,
  USER,
  LOGIN,
  LOGOUT,
  REGISTER,
}
