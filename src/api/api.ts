import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { computed, ref } from 'vue'
import { useAuth, API_TOKEN } from './auth'

const URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5100' : 'https://api.jasse.io'

export const useApi = (endpoint: string, access_token?: string) => {
  const api = axios.create({
    baseURL: URL,
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : undefined
    }
  })

  const data = ref()
  const loading = ref(false)
  const error = ref()

  const post = (payload?: Record<string, any>) => {
    loading.value = true
    error.value = undefined

    return api
      .post(endpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e

        throw e
      })
      .finally(() => (loading.value = false))
  }

  const get = (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loading.value = true
    error.value = undefined

    let queryString = ''

    if (query) {
      queryString = `?${Object.entries(query)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')}`
    }

    return api
      .get(endpoint + queryString, config)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e

        throw e
      })
      .finally(() => (loading.value = false))
  }

  const errorMessage = computed(() => {
    if (error.value) {
      if (error.value.response && error.value.response.data)
        return error.value.response.data.message
      else return error.value.response
    } else {
      return null
    }
  })

  return {
    loading,
    data,
    error,
    get,
    post,
    errorMessage
  }
}

export const useApiWithAuth = (endpoint: string) => {
  const { user } = useAuth()

  return useApi(endpoint, user?.value ? user.value[API_TOKEN] : undefined)
}
