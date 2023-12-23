import { Socket } from 'socket.io-client'
import { type Ref, ref, computed } from 'vue'
import type { IPlayer, ICard, WisInfo, WisDeclare } from '~/types'

export default function useWisFunctions(
  socket: Socket,
  self: IPlayer | undefined,
  selfCanPlay: Ref<boolean>,
  playerCards: Ref<ICard[]>
) {
  const wisList = ref<WisInfo[]>([])
  const wiseAreFinal = ref(false)
  const wisDeclarelist = ref<WisDeclare[]>([])
  const selectedCards = ref<ICard[]>([])
  let wisId = 0
  // TODO: Respect settings for wise
  const canWise = computed(() => selfCanPlay.value && playerCards.value.length === 9)
  const selectCard = (card: ICard) => {
    if (!canWise.value) return
    if (selectedCards.value.find((c) => c.id === card.id))
      selectedCards.value = selectedCards.value.filter((c) => c.id !== card.id)
    else selectedCards.value.push(card)
  }
  const onSelectWis = (wisType: string) => {
    wisId += 1
    wisDeclarelist.value.push({ id: wisId, type: wisType, cards: selectedCards.value })
    selectedCards.value = []
  }

  const sendWis = () => {
    const hasStoeck = wisDeclarelist.value.find((w) => w.type === 'stoeck')
    const wise = wisDeclarelist.value.filter((w) => w.type !== 'stoeck')
    if (wise) socket.emit('wis', self?.id, wisDeclarelist.value)
    if (hasStoeck) socket.emit('stoeck', self?.id)
  }
  // Response: Some wis not valid, clear all
  socket.on('wisinvalid', () => {
    wisId = 0
    selectedCards.value = []
    wisDeclarelist.value = []
  })

  // Response: Get highest wis from server for each player
  socket.on('wisdeclare', (wisInfo: WisInfo[]) => {
    wisList.value = wisInfo
    selectedCards.value = []
    wisId = 0
    wisDeclarelist.value = []
  })

  // Response: Get all wise for winning players
  const tempPointsRed = ref(0)
  const tempPointsBlue = ref(0)
  socket.on('wiswin', (wisInfo: WisInfo[], score: { teamA: number; teamB: number }) => {
    wisList.value = wisInfo
    wiseAreFinal.value = true
    tempPointsRed.value = score.teamB
    tempPointsBlue.value = score.teamA
    setTimeout(() => {
      wiseAreFinal.value = false
      wisList.value = []
    }, 5000)
  })

  socket.on('cleartempwis', () => {
    tempPointsRed.value = 0
    tempPointsBlue.value = 0
  })

  const getWiseByPlace = (place: number): number[] => {
    const list = wisList.value.find((w) => w.playerPlace === place)
    if (!list) return []
    return list.wise
  }

  const getCardWisid = (card: ICard): number | undefined => {
    return wisDeclarelist.value.find((w) => w.cards.includes(card))?.id
  }

  const getCardClasses = (card: ICard): any => {
    return {
      invalid: false,
      selected: selectedCards.value.find((c) => c.id === card.id) || getCardWisid(card)
    }
  }
  return {
    tempPointsRed,
    tempPointsBlue,
    selectCard,
    selectedCards,
    wisDeclarelist,
    getCardClasses,
    getCardWisid,
    onSelectWis,
    sendWis,
    getWiseByPlace,
    wiseAreFinal
  }
}
