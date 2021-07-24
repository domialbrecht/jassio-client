import { computed } from 'vue'
import { useApi } from './api'
import { GameStats } from '~/types'

export default function useStats() {
  const { isFetching, error, data } = useApi('stats/games', false).get()

  const gameStats = computed(() => {
    if (!data.value) return undefined
    console.log(data.value)
    return data.value as GameStats
  })
  return { isFetching, error, gameStats }
}
