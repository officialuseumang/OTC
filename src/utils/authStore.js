import authSeed from '../data/auth.json'

const AUTH_USERS_KEY = 'otc_users'

const STORAGE_SCOPE = {
  LOCAL: 'local',
  SESSION: 'session',
}

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function getStorage(scope) {
  if (typeof window === 'undefined') return null
  return scope === STORAGE_SCOPE.SESSION ? window.sessionStorage : window.localStorage
}

function getFromStorage(key, scope = STORAGE_SCOPE.LOCAL) {
  const storage = getStorage(scope)
  if (!storage) return null
  const raw = storage.getItem(key)
  if (!raw) return null
  return safeParse(raw)
}

function setInStorage(key, value, scope = STORAGE_SCOPE.LOCAL) {
  const storage = getStorage(scope)
  if (!storage) return
  storage.setItem(key, JSON.stringify(value))
}

function removeFromStorage(key, scope = STORAGE_SCOPE.LOCAL) {
  const storage = getStorage(scope)
  if (!storage) return
  storage.removeItem(key)
}

function migrateLegacyUsersToSession(legacyUsers) {
  if (!Array.isArray(legacyUsers) || legacyUsers.length === 0) return
  setInStorage(AUTH_USERS_KEY, legacyUsers, STORAGE_SCOPE.SESSION)
  removeFromStorage(AUTH_USERS_KEY, STORAGE_SCOPE.LOCAL)
}

function getFromLocalStorage(key) {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(key)
  if (!raw) return null
  return safeParse(raw)
}

export function getUsers() {
  const storedInSession = getFromStorage(AUTH_USERS_KEY, STORAGE_SCOPE.SESSION)
  if (Array.isArray(storedInSession)) return storedInSession

  const legacyStored = getFromLocalStorage(AUTH_USERS_KEY)
  if (Array.isArray(legacyStored)) {
    migrateLegacyUsersToSession(legacyStored)
    return legacyStored
  }

  return Array.isArray(authSeed.users) ? authSeed.users : []
}

export function addUser(user) {
  const users = getUsers()
  const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())
  if (exists) {
    const error = new Error('USER_EXISTS')
    error.code = 'USER_EXISTS'
    throw error
  }
  const next = [
    ...users,
    {
      id: `u-${Date.now()}`,
      ...user,
    },
  ]
  setInStorage(AUTH_USERS_KEY, next, STORAGE_SCOPE.SESSION)
  return next
}

export function addUserRegistration(registration) {
  const users = getUsers()
  if (!registration || !registration.email) return users

  const normalizedEmail = registration.email.toLowerCase()
  let changed = false

  const next = users.map((u) => {
    if (u.email && u.email.toLowerCase() === normalizedEmail) {
      const existing = Array.isArray(u.registrations) ? u.registrations : []
      changed = true
      return {
        ...u,
        registrations: [
          ...existing,
          {
            id: `reg-${Date.now()}`,
            intent: registration.intent,
            programId: registration.programId,
            message: registration.message,
            submittedAt: registration.submittedAt,
          },
        ],
      }
    }
    return u
  })

  if (changed) {
    setInStorage(AUTH_USERS_KEY, next, STORAGE_SCOPE.SESSION)
  }

  return next
}

export function findUser(email, password) {
  const users = getUsers()
  const normalizedEmail = email.toLowerCase()
  return (
    users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password,
    ) || null
  )
}

export function getAdmins() {
  return Array.isArray(authSeed.admins) ? authSeed.admins : []
}

export function findAdmin(email, password) {
  const admins = getAdmins()
  const normalizedEmail = email.toLowerCase()
  return (
    admins.find(
      (a) => a.email.toLowerCase() === normalizedEmail && a.password === password,
    ) || null
  )
}
