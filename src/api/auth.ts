import { reactive, toRefs, watch } from 'vue'
import { useApi } from './api'

const TOKEN_KEY = 'jassio_token'
export const API_TOKEN = 'access_token'

interface User {
  email: string
  [API_TOKEN]: string
}

interface AuthState {
  authenticating: boolean
  user?: User
  error?: Error
}

const state = reactive<AuthState>({
  authenticating: false,
  user: undefined,
  error: undefined
})

// Token already set on sysetm
const token = window.localStorage.getItem(TOKEN_KEY)
if (token) {
  const { loading, error, data, get } = useApi('/auth/user')
  state.authenticating = true

  get({}, { headers: { Authorization: `Bearer ${token}` } })

  watch([loading], () => {
    if (error.value) window.localStorage.removeItem(TOKEN_KEY)
    else if (data.value) state.user = data.value

    state.authenticating = false
  })
}

export const useAuth = () => {
  const setUser = (payload: User, remember: boolean): void => {
    if (remember) window.localStorage.setItem(TOKEN_KEY, payload[API_TOKEN])

    state.user = payload
    state.error = undefined
  }

  const logout = (): Promise<void> => {
    window.localStorage.removeItem(TOKEN_KEY)
    return Promise.resolve((state.user = undefined))
  }

  return {
    setUser,
    logout,
    ...toRefs(state)
  }
}
