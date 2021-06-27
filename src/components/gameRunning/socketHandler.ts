import { Socket } from 'socket.io-client'
import { Ref } from 'vue'
import { ICard } from '~/types'
export default function useBoardConnection(socket: Socket, playerCards: Ref<ICard[]>, playerRightPlayedAmount: Ref<number>, playerTopPlayedAmount: Ref<number>, playerLeftPlayedAmount: Ref<number>) {
  socket.on('getCards', (cards: ICard[]) => {
    playerCards.value = cards
    // After new cards are recieved, reset other player representation
    playerRightPlayedAmount.value = 0
    playerTopPlayedAmount.value = 0
    playerLeftPlayedAmount.value = 0
  })
}
