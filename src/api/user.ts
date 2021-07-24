import { ref } from 'vue'
import { useApi } from './api'
import { User } from '~/types'

export interface AuthState {
  authenticated: boolean
  user: User |undefined
}

export const authState = ref<AuthState>({ authenticated: false, user: undefined })

export function useUser() {
  const login = (email: string, password: string) => {
    const { isFetching, error, data } = useApi('auth/login', false).post({ email, password })
    return { isFetching, error, data }
  }
  const register = (email: string, password: string) => {
    const { isFetching, error, data } = useApi('auth/signup', false).post({ email, password })
    return { isFetching, error, data }
  }

  return { login, register }
}
