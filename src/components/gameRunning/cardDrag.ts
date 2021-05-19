import { Ref, ref } from 'vue'
import { ICard, IBoard } from '~/types'

export default function useCardRag(playerCards: Ref<ICard[]>, playedCards: Ref<IBoard>, tempHand: Ref<ICard[]>) {
  const dragCard = ref<ICard>({ id: 0, display: '', value: 0, suit: 'heart' }) // Var for dragged card info
  const dragActive = ref(false) // Helper for class to prevent effects while drag
  const startDrag = (evt: DragEvent, card: ICard) => {
    if (!evt.dataTransfer) return
    dragActive.value = true
    playerCards.value = playerCards.value.filter((c) => {
      return c !== card
    })
    dragCard.value = card
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
  }
  const handleDrop = (evt: DragEvent) => {
    if (!evt || !dragCard.value) return
    evt.preventDefault()
    playedCards.value.r2 = dragCard.value
    dragCard.value = { id: 0, display: '', value: 0, suit: 'heart' }
  }
  const allowDrop = (evt: DragEvent) => {
    evt.preventDefault()
  }
  const handleDragEnd = (evt: DragEvent, card: ICard) => {
    console.log('dragend')
    if (evt.dataTransfer?.dropEffect === 'none') {
      dragActive.value = false
      dragCard.value = card
      playerCards.value = tempHand.value
    }
  }

  return {
    startDrag, handleDrop, allowDrop, handleDragEnd, dragActive,
  }
}
