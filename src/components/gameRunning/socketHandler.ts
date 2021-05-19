import { Socket } from 'socket.io-client'
import { Ref } from 'vue'
import { ICard } from '~/types'
export default function useBoardConnection(socket: Socket, playerCards: Ref<ICard[]>, tempHand: Ref<ICard[]>) {
  socket.on('getCards', (cards: ICard[]) => {
    playerCards.value = cards
    tempHand.value = cards
  })
}
