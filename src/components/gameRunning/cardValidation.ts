import { computed, Ref, ComputedRef } from 'vue'
import { ICard, TurnType } from '~/types'

export default function useCardValidation(playerCards: Ref<ICard[]>, lastCardValue: ComputedRef<number | undefined>, type: Ref<string>) {
  const validateUpdown = (prevVal: number, iCardVal: number) => {
    if (prevVal > iCardVal) return false
    return true
  }

  const validateDownup = (prevVal: number, iCardVal: number) => {
    if (prevVal > iCardVal) return false
    return true
  }

  const validateSlalom = (prevVal: number, iCardVal: number) => {
    if (prevVal > iCardVal) return false
    return true
  }

  const validateTrumpf = (prevVal: number, iCardVal: number) => {
    if (prevVal > iCardVal) return false
    return true
  }
  const validation = (card: ICard, lcv: number) => {
    switch (type.value as TurnType) {
      case TurnType.UPDOWN:
        validateUpdown(card.value, lcv)
        break
      case TurnType.DOWNUP:
        validateDownup(card.value, lcv)
        break
      case TurnType.SLALOM:
        validateSlalom(card.value, lcv)
        break
      case TurnType.T_HEART:
        validateTrumpf(card.value, lcv)
        break
      case TurnType.T_DIAMOND:
        validateTrumpf(card.value, lcv)
        break
      case TurnType.T_SPADE:
        validateTrumpf(card.value, lcv)
        break
      case TurnType.T_CLUB:
        validateTrumpf(card.value, lcv)
        break
      default:
        break
    }
  }

  const validCards = computed(() => {
    console.log(type.value as TurnType)
    console.log('TEST VALIDATE')
    return playerCards.value.map(c => c.id)

    // const lastVal = lastCardValue.value
    // if (!lastVal) return playerCards.value.map(c => c.id)
    // return playerCards.value.filter(c => validation(c, lastVal)).map(c => c.id)
  })

  return {
    validCards,
  }
}
