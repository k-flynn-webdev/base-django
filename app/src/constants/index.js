// todo : Add default func objects in each object

export const VARS = {
  name: 'BASE',
  pageLimit: 20,
  sort: {
    direction: [
      { name: 'asc', value: 1 },
      { name: 'desc', value: -1 }
      ],
    types: [
      { name: 'created', value: 'created_at' },
      { name: 'updated', value: 'updated_at' },
    ]
  },
  userLocal: 'user-local'
}

export const CSRF = {
  value: 'csrf',
  API: {
    GET: '/api/csrf',
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

export const REGISTER = {
  value: 'signup',
  route: { name: 'signup', path: '/accounts/signup' },
  API: {
    GET: '/accounts/signup',
    POST: '/accounts/signup'
  },
  isValid: (input) => {
    return (input &&
        input.email &&
        input.password &&
        checkEmail(input.email) &&
        checkPassword(input.password))
  }
}

export const LOGIN = {
  value: 'login',
  route: { name: 'login', path: '/accounts/login/' },
  API: {
    GET: '/accounts/login',
    POST: '/accounts/login'
  },
  isValid: REGISTER.isValid
}

export const LOGOUT = {
  value: 'logout',
  route: { name: 'logout', path: '/accounts/logout/' },
  API: {
    GET: '/accounts/logout',
    POST: '/accounts/logout'
  }
}

export const USER = {
  value: 'user',
  store: 'user',
  route: { name: 'user', path: '/user' },
  API: {
    GET: '/api/whoami'
  }
}

// export const ADMIN = {
//   value: 'admin',
//   store: 'admin',
//   route: { name: 'admin', path: '/admin' },
//   API: {
//     GET: '/config/admin/me',
//     POST: '/config/admin',
//     PATCH: '/config/admin',
//     DELETE: '/config/admin',
//   }
// }

/**
 * @typedef {object}    Track
 *
 * @property {number}   id
 * @property {number}   user
 * @property {string}   track
 * @property {Tag[]}    tags
 * @property {date}     created_at
 * @property {date}     updated_at
 */

export const ALL = {
  VARS,
  CSRF,
  USER,
  LOGIN,
  LOGOUT,
  REGISTER,
}
