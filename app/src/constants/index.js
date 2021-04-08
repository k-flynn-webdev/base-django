// todo : Add default func objects in each object

export const VARS = {
  name: 'Minitrack',
  pageLimit: 20,
  sort: {
    direction: [
      { name: 'asc', value: 1 },
      { name: 'desc', value: -1 }
      ],
    types: [
      { name: 'created', value: 'created_at' },
      { name: 'updated', value: 'updated_at' },
      { name: 'done', value: 'done_at' },
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
  value: 'login',
  route: { name: 'login', path: '/login' },
  API: {
    POST: '/rest-auth/register'
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
  route: { name: 'login', path: '/login' },
  API: {
    POST: '/rest-auth/login'
  },
  isValid: (input) => {
    return (input &&
        input.email &&
        input.password &&
        checkEmail(input.email) &&
        checkPassword(input.password))
  }
}

export const LOGOUT = {
  value: 'logout',
  route: { name: 'logout', path: '/logout' },
  API: {
    DELETE: '/rest-auth/logout'
  }
}

// export const VERIFY = {
//   value: 'verify',
//   route: { name: 'verify', path: '/verify' },
//   API: { GET: '/config/verify' }
// }
//
// export const RECOVER = {
//   value: 'recover',
//   route: { name: 'recover', path: '/recover' },
//   API: {
//     GET: '/config/recover',
//     PATCH: '/config/recover'
//   }
// }

export const USER = {
  value: 'user',
  store: 'user',
  route: { name: 'user', path: '/user' },
  API: {
    GET: '/rest-auth/user'
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

export const TRACK = {
  value: 'track',
  store: 'track',
  route: {
    name: 'track',
    path: '/track',
  },
  API: {
    GET: '/api/track',
    POST: '/api/track',
    PATCH: '/api/track',
    DELETE: '/api/track',
  },
  /**
   * Check if input is valid
   * @returns {boolean}
   */
  isValid: (input) => { return input &&
      input.track &&
      input.track.length >= 5 },
  /**
   * Creates default Track
   * @return {Track}
   */
  default: () => {
    return {
      id: -1,
      user: -1,
      value: '',
      tags: [],
      created_at: '',
      updated_at: '',
    }
  }
}

/**
 * @typedef {object}    Tag
 *
 * @property {number}   id
 * @property {number}   user
 * @property {string}   value
 * @property {date}     created_at
 */

export const TAG = {
  value: 'tag',
  store: 'tag',
  route: {
    name: 'tag',
    path: '/tag',
  },
  API: {
    GET: '/api/tag',
    POST: '/api/tag',
    PATCH: '/api/tag',
    DELETE: '/api/tag',
  },
  /**
   * Check if input is valid
   * @returns {boolean}
   */
  isValid: (input) => { return input &&
      input.value &&
      input.value.length >= 3 },
  /**
   * Creates default Tag
   * @return {Tag}
   */
  default: () => {
    return {
      id: -1,
      user: -1,
      value: '',
      created_at: '',
    }
  }
}

//
// export const PLAN = {
//   index: 2,
//   text: 'plans',
//   value: 'plan',
//   store: 'plans',
//   parent: 'project',
//   child: 'task',
//   children: ['plan', 'task'],
//   route: {
//     name: 'plan',
//     path: '/plans',
//   },
//   API: {
//     GET: '/config/plans',
//     POST: '/config/plans',
//     PATCH: '/config/plans',
//     DELETE: '/config/plans',
//   }
// }
//
// export const TASK = {
//   index: 1,
//   text: 'tasks',
//   value: 'task',
//   store: 'tasks',
//   parent: 'plan',
//   child: null,
//   children: ['task'],
//   route: {
//     name: 'task',
//     path: '/tasks',
//   },
//   API: {
//     GET: '/config/tasks',
//     POST: '/config/tasks',
//     PATCH: '/config/tasks',
//     DELETE: '/config/tasks',
//   }
// }
//
// export const HOME = {
//   value: 'Minitask',
//   route: {
//     name: 'home',
//     path: '/',
//   }
// }

// export const TYPES = {
//   home: HOME,
//   project: PROJECT,
//   plan: PLAN,
//   task: TASK
// }

export const ALL = {
  VARS,
  CSRF,
  USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  // VERIFY,
  // RECOVER,
  // ADMIN,
  TAG,
  TRACK,
  // TRACKS,
  // PLAN,
  // TASK,
  // HOME,
  // TYPES
}
