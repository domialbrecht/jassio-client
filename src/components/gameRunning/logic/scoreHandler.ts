import { Socket } from 'socket.io-client'
import { ref, computed } from 'vue'
import { Team } from '~/types'
export default function useScoreFunctions(socket: Socket) {
  const pointsRed = ref(0)
  const pointsBlue = ref(0)
  const stichRed = computed(() => pointsRed.value > 0)
  const stichBlue = computed(() => pointsBlue.value > 0)
  socket.on('score', (score: { teamA: number; teamB: number }) => {
    pointsRed.value = score.teamB
    pointsBlue.value = score.teamA
  })
  const winnerTeam = ref<Team>()
  socket.on('win', (team: Team) => {
    winnerTeam.value = team
  })

  return {
    pointsRed,
    pointsBlue,
    stichRed,
    stichBlue,
    winnerTeam
  }
}
