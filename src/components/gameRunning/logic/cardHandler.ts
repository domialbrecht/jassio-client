import { Socket } from 'socket.io-client'
import { ref, computed } from 'vue'
import type { ICard, PlayedCard, IPlayer } from '~/types'

export default function useCardFunctions(
  socket: Socket,
  self: IPlayer | undefined,
  boardPlayers: IPlayer[]
) {
  const playerCards = ref<ICard[]>([])
  let playerCardsBackup: ICard[] = []
  const backupPlayerHand = () => {
    playerCardsBackup = playerCards.value
  }
  // Simple single space array for holding player cards, has to be array for draggable
  const instanceOfCard = (object: any): object is ICard => {
    return 'display' in object
  }
  const playerPlayedCard = ref<ICard[]>([])
  const otherPlayedCards = ref<PlayedCard[]>([])
  const getPlayedCardByPlace = (place: number): string => {
    const card = otherPlayedCards.value.find((c) => c.place === place)
    return card ? card.display : ''
  }
  const getRightPlayedCard = computed(() => {
    return getPlayedCardByPlace(boardPlayers[1].place)
  })
  const getTopPlayedCard = computed(() => {
    return getPlayedCardByPlace(boardPlayers[2].place)
  })
  const getLeftPlayedCard = computed(() => {
    return getPlayedCardByPlace(boardPlayers[3].place)
  })
  const getLastPlayedValue = computed(() => {
    const card = otherPlayedCards.value.find((c) => c.place === 3)
    return card ? card.value : undefined
  })

  const getOtherCardOffset = (i: number): any => {
    return {
      top: `${-13 + 8.8 * i}%`
    }
  }

  const playerRightPlayedAmount = ref(0)
  const playerTopPlayedAmount = ref(0)
  const playerLeftPlayedAmount = ref(0)

  const isTurnOfPlayerAtPlace = ref(-1)
  const selfCanPlay = computed(() => {
    return self?.place === isTurnOfPlayerAtPlace.value
  })
  socket.on('playerturn', (playerPlace: number) => {
    isTurnOfPlayerAtPlace.value = playerPlace
  })
  socket.on('wrongCard', () => {
    // Server did not have played card on player, reset
    // FIXME: COULD BE BROKEN IF PLAYER SEND DRAG-START EVENT BEFORE SERVER RESPONDS
    playerCards.value = playerCardsBackup
    playerPlayedCard.value = []
  })
  const cardPlayed = (evt: any) => {
    if (!selfCanPlay.value) {
      playerCards.value = playerCardsBackup
      playerPlayedCard.value = []
      return
    }
    if (!evt.added || !evt.added.element || !instanceOfCard(evt.added.element)) return
    const card = evt.added.element as ICard
    socket.emit('cardPlayed', card.id, self?.id)
  }
  socket.on('cards', (cards: PlayedCard[]) => {
    if (isTurnOfPlayerAtPlace.value === boardPlayers[1].place)
      playerRightPlayedAmount.value = playerRightPlayedAmount.value + 1
    else if (isTurnOfPlayerAtPlace.value === boardPlayers[2].place)
      playerTopPlayedAmount.value = playerTopPlayedAmount.value + 1
    else if (isTurnOfPlayerAtPlace.value === boardPlayers[3].place)
      playerLeftPlayedAmount.value = playerLeftPlayedAmount.value + 1
    otherPlayedCards.value = cards
  })

  socket.on('getCards', (cards: ICard[]) => {
    playerCards.value = cards
    // After new cards are recieved, reset other player representation
    playerRightPlayedAmount.value = 0
    playerTopPlayedAmount.value = 0
    playerLeftPlayedAmount.value = 0
  })

  return {
    selfCanPlay,
    playerCards,
    backupPlayerHand,
    playerPlayedCard,
    otherPlayedCards,
    getRightPlayedCard,
    getTopPlayedCard,
    getLeftPlayedCard,
    cardPlayed,
    getOtherCardOffset,
    isTurnOfPlayerAtPlace,
    getLastPlayedValue,
    playerRightPlayedAmount,
    playerTopPlayedAmount,
    playerLeftPlayedAmount
  }
}
