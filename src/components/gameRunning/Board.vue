<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, PropType, inject, computed } from 'vue'
import draggable from 'vuedraggable'
import PlayerCard from '../helpers/PlayerCard.vue'
import TypeSelector from './TypeSelector.vue'
import WisSelector from './WisSelector.vue'
import WisList from './WisList.vue'
import useBoardConnection from './socketHandler'
import { IPlayer, ICard } from '~/types'

type PlayedCard = {
  display: string
  place: number
  value: number
}

type WisInfo = {
  playerId: string
  playerPlace: number
  highestWisValue: number
}

export default defineComponent({
  components: {
    PlayerCard, TypeSelector, WisSelector, WisList, draggable,
  },
  props: {
    players: { type: Array as PropType<Array<IPlayer>>, required: true },
  },
  setup(props, { emit }) {
    const shiftPlayers = (a: IPlayer[], amount: number) => {
      if (a.length < 1) return a
      for (let index = 0; index < amount; index++)
        a.push(a.shift()!)
      return a
    }
    const boardPlayers = ref<IPlayer[]>([])
    const self = props.players.find(p => p.self)
    const selfPlace = self?.place
    boardPlayers.value = shiftPlayers([...props.players], selfPlace || 0)

    const socket: Socket = inject('socket')!
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
    const selectedCards = ref<ICard[]>([])
    const otherPlayedCards = ref<PlayedCard[]>([])
    const getPlayedCardByPlace = (place: number): string => {
      const card = otherPlayedCards.value.find(c => c.place === place)
      return card ? card.display : ''
    }
    const getRightPlayedCard = computed(() => {
      return getPlayedCardByPlace(boardPlayers.value[1].place)
    })
    const getTopPlayedCard = computed(() => {
      return getPlayedCardByPlace(boardPlayers.value[2].place)
    })
    const getLeftPlayedCard = computed(() => {
      return getPlayedCardByPlace(boardPlayers.value[3].place)
    })
    const getLastPlayedValue = computed(() => {
      const card = otherPlayedCards.value.find(c => c.place === 3)
      return card ? card.value : undefined
    })

    // const sideCards = ref(null)
    // const { sideCardsWidth, sideCardsHeight } = useSizeObserver(sideCards)

    /* function useSizeObserver(sideCards: Ref) {
      const sideCardsWidth = ref(0)
      const sideCardsHeight = ref(0)
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          sideCardsWidth.value = entry.contentRect.width
          sideCardsHeight.value = entry.contentRect.height
        }
      })
      onMounted(() => resizeObserver.observe(sideCards.value))
      onBeforeUnmount(() => resizeObserver.unobserve(sideCards.value))
      return {
        sideCardsWidth,
        sideCardsHeight,
      }
    } */

    const getOtherCardOffset = (i: number): any => {
      return {
        top: `${-13 + 8.8 * i}%`,
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
      if (isTurnOfPlayerAtPlace.value === boardPlayers.value[1].place)
        playerRightPlayedAmount.value = playerRightPlayedAmount.value + 1
      else if (isTurnOfPlayerAtPlace.value === boardPlayers.value[2].place)
        playerTopPlayedAmount.value = playerTopPlayedAmount.value + 1
      else if (isTurnOfPlayerAtPlace.value === boardPlayers.value[3].place)
        playerLeftPlayedAmount.value = playerLeftPlayedAmount.value + 1
      otherPlayedCards.value = cards
    })

    const wisList = ref<WisInfo[]>([])
    const canWise = ref(false)
    // TODO: Enable wise
    // const canWise = computed(() => selfCanPlay.value && playerCards.value.length === 9 && props.settings.enableWise)
    const selectCard = (card: ICard) => {
      if (!canWise.value) return
      if (selectedCards.value.find(c => c.id === card.id))
        selectedCards.value = selectedCards.value.filter(c => c.id !== card.id)
      else selectedCards.value.push(card)
    }
    const onSelectWis = (wisType: string) => {
      socket.emit('wis', self?.id, selectedCards.value, wisType)
    }
    socket.on('wisdeclare', (wisInfo: WisInfo[]) => {
      wisList.value = wisInfo
      selectedCards.value = []
    })
    const getHighestWisByPlace = (place: number): number => {
      const list = wisList.value.find(w => w.playerPlace === place)
      if (!list) return 0
      return list.highestWisValue
    }
    const getCardClasses = (card: ICard): any => {
      return {
        invalid: false,
        selected: selectedCards.value.find(c => c.id === card.id),
      }
    }

    const pointsRed = ref(0)
    const pointsBlue = ref(0)
    const stichRed = computed(() => pointsRed.value > 0)
    const stichBlue = computed(() => pointsBlue.value > 0)
    socket.on('score', (score: { teamA: number; teamB: number }) => {
      pointsRed.value = score.teamB
      pointsBlue.value = score.teamA
    })
    socket.on('clearboard', () => {
      wisList.value = []
      otherPlayedCards.value = []
      playerPlayedCard.value = []
    })

    const showPicker = ref(false)
    const selectedTypeName = ref('')
    // TODO: Secure me on server with check
    socket.on('turnselect', () => {
      showPicker.value = true
    })
    const onSelectType = (type: string) => {
      showPicker.value = false
      selectedTypeName.value = type
      socket.emit('typeselected', type)
    }
    socket.on('typegotselected', (type: string) => {
      selectedTypeName.value = type
    })

    useBoardConnection(socket, playerCards, playerRightPlayedAmount, playerTopPlayedAmount, playerLeftPlayedAmount)

    const sortCards = () => {
      playerCards.value = playerCards.value.sort((c1, c2) => c1.id - c2.id)
    }
    const keyDownHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyS':
          sortCards()
          break
        default:
          break
      }
    }
    document.addEventListener('keydown', keyDownHandler)

    return {
      boardPlayers, playerCards, backupPlayerHand, playerPlayedCard, otherPlayedCards, getRightPlayedCard, getTopPlayedCard, getLeftPlayedCard, stichRed, stichBlue, pointsRed, pointsBlue, showPicker, onSelectType, selectedTypeName, cardPlayed, getOtherCardOffset, isTurnOfPlayerAtPlace, getLastPlayedValue, playerRightPlayedAmount, playerTopPlayedAmount, playerLeftPlayedAmount, selectCard, selectedCards, getCardClasses, onSelectWis, getHighestWisByPlace,
    }
  },
})

</script>
<template>
  <div v-if="boardPlayers.length === 4" class="grid h-full board bg-blue-gray-900 overflow-hidden">
    <div class="bg-darker border-b-2">
      <div class="transform -rotate-180 flex flex-col h-full p-3 items-center">
        <PlayerCard
          :in-board="true"
          :player="boardPlayers[2]"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[2].place"
        />
        <WisList :value="getHighestWisByPlace(boardPlayers[2].place)" />
      </div>
    </div>
    <div class="bg-darker border-b-2">
      <div class="flex justify-center w-full h-full px-4 py-2">
        <div v-for="i in 9 - playerTopPlayedAmount" :key="i" class="h-full card-wrapper">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#back`" fill="red" />
          </svg>
        </div>
      </div>
    </div>
    <div class="bg-dark border-l-2">
      <div class="transform -rotate-90 flex flex-col h-full p-3 items-center">
        <PlayerCard
          :in-board="true"
          :player="boardPlayers[1]"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[1].place"
        />
        <WisList :value="getHighestWisByPlace(boardPlayers[1].place)" />
      </div>
    </div>
    <div class="bg-dark border-r-2 min-h-0">
      <div ref="sideCards" class="h-full flex flex-col relative">
        <svg
          v-for="i in 9 - playerLeftPlayedAmount"
          :key="i"
          class="w-40 absolute left-11"
          :style="getOtherCardOffset(i)"
          viewBox="0 0 169 245"
          transform="rotate(90)"
        >
          <use :href="`/images/svg-cards.svg#back`" fill="#384d82" />
        </svg>
      </div>
    </div>
    <div class="field relative h-full">
      <div class="absolute field-sr">
        <svg v-if="stichRed" class="h-44" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#back`" fill="#6f1a5f" />
        </svg>
      </div>
      <div class="absolute field-sb">
        <svg v-if="stichBlue" class="h-44" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#back`" fill="#384d82" />
        </svg>
      </div>
      <div class="absolute field-info text-white flex flex-col items-center">
        <div>
          <span class="uppercase text-3xl">{{ selectedTypeName }}</span>
        </div>
        <div class="text-2xl mt-2">
          <span class="text-purple-800">{{ pointsRed }}</span> /
          <span class="text-blue-900">{{ pointsBlue }}</span>
        </div>
      </div>
      <div class="field-players players-blue">
        <div class="field-player field-pb1">
          <svg v-if="getTopPlayedCard" class="h-64" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#${getTopPlayedCard}`" />
          </svg>
        </div>
        <draggable
          v-model="playerPlayedCard"
          class="field-player field-pb2 playable"
          group="hand"
          tag="div"
          ghost-class="ghost-card"
          item-key="id"
          @change="cardPlayed"
        >
          <template #item="{ element }">
            <svg class="h-64" viewBox="0 0 169 245">
              <use :href="`/images/svg-cards.svg#${element.display}`" />
            </svg>
          </template>
        </draggable>
      </div>
      <div class="field-players players-red">
        <div class="field-player field-pr1">
          <svg v-if="getLeftPlayedCard" class="h-64" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#${getLeftPlayedCard}`" />
          </svg>
        </div>
        <div class="field-player field-pr2">
          <svg v-if="getRightPlayedCard" class="h-64" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#${getRightPlayedCard}`" />
          </svg>
        </div>
      </div>
    </div>
    <div class="bg-dark border-l-2 relative">
      <div class="h-full flex flex-col relative">
        <svg
          v-for="i in 9 - playerRightPlayedAmount"
          :key="i"
          class="w-40 absolute left-11"
          :style="getOtherCardOffset(i)"
          viewBox="0 0 169 245"
          transform="rotate(90)"
        >
          <use :href="`/images/svg-cards.svg#back`" fill="#384d82" />
        </svg>
      </div>
    </div>
    <div class="bg-dark border-r-2">
      <div class="transform rotate-90 flex flex-col h-full p-3 items-center">
        <PlayerCard
          :in-board="true"
          :player="boardPlayers[3]"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[3].place"
        />
        <WisList :value="getHighestWisByPlace(boardPlayers[3].place)" />
      </div>
    </div>
    <div class="bg-darker border-t-2">
      <draggable
        v-model="playerCards"
        class="flex justify-center h-full px-4 py-2 hand"
        group="hand"
        tag="div"
        item-key="id"
        @start="backupPlayerHand"
      >
        <template #item="{ element }">
          <div
            class="h-full card-wrapper"
            :class="getCardClasses(element)"
            @click="selectCard(element)"
          >
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="`/images/svg-cards.svg#${element.display}`" />
            </svg>
          </div>
        </template>
      </draggable>
    </div>
    <div class="bg-darker border-t-2 relative">
      <div class="flex flex-col h-full p-3 items-center">
        <PlayerCard
          :in-board="true"
          :player="boardPlayers[0]"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[0].place"
        />
        <WisList :value="getHighestWisByPlace(boardPlayers[0].place)" />
      </div>
    </div>
  </div>
  <transition name="fade">
    <TypeSelector v-if="showPicker" @selected="onSelectType" />
  </transition>
  <transition name="fade">
    <WisSelector v-if="selectedCards.length > 0" @selected="onSelectWis" />
  </transition>
</template>
<style scoped>
.board {
  grid-template-columns: 250px auto 250px;
  grid-template-rows: 250px auto 250px;
  grid-template-areas:
    "player1Icon player1Hand player2Icon"
    "player4Hand board player2Hand"
    "player4Icon player3Hand player3Icon";
}

.field-players {
  display: flex;
  position: absolute;
  justify-content: space-between;
}

.players-blue {
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  padding: 20px 0;
}

.players-red {
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 20px;
}

.field-player {
  @apply bg-blue-gray-600;
  min-width: 177px;
  min-height: 256px;
  border-radius: 8px;
}

.field-info {
  right: 20px;
}

.field-sr {
  top: 5px;
  left: 5px;
}

.field-sb {
  right: 5px;
  bottom: 5px;
}

.card-wrapper {
  width: 162px;
  position: relative;
  transition: all 0.3s;
}

.invalid::after {
  opacity: 0.5;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 98%;
  height: 100%;
  border-radius: 11px;
  background: #d02655;
}

.selected {
  transform: translateY(-30px);
}

.ghost-card {
  width: auto !important;
}

.hand-enter-active,
.hand-leave-active {
  max-width: 162px;
  transition: all 0.2s ease;
}
.hand-enter-from,
.hand-leave-to {
  max-width: 0;
}

svg,
svg * {
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
