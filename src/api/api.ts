import { createFetch } from '@vueuse/core'
import { ref } from 'vue'
const URL = import.meta.env.MODE === 'development' ? 'http://localhost:5100' : 'https://api.sirfilior.com'
const AUTH_KEY = 'jassio_token'

const getToken = async() => {
  return window.localStorage.getItem(AUTH_KEY)
}

const getInstance = (withToken: boolean) => {
  return createFetch({
    baseUrl: URL,
    options: {
      async beforeFetch({ options, cancel }) {
        if (withToken) {
          const token = await getToken()
          if (!token)
            cancel()
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          }
        }
        return { options }
      },
    },
    fetchOptions: {
      mode: 'cors',
    },
  })
}

export const useApi = (endpoint: string, withAuth: boolean) => {
  const authInstance = getInstance(withAuth)
  const get = () => {
    const { isFetching, error, data } = authInstance(endpoint).get().json()
    return { isFetching, error, data }
  }
  const post = (payload?: unknown) => {
    const { isFetching, error, data } = authInstance(endpoint).post(payload).json()
    return { isFetching, error, data }
  }

  return { get, post }
}
