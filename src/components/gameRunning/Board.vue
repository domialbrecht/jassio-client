<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, PropType, inject, computed } from 'vue'
import draggable from 'vuedraggable'
import PlayerCard from '../helpers/PlayerCard.vue'
import TypeSelector from './TypeSelector.vue'
import useBoardConnection from './socketHandler'
import { IPlayer, ICard } from '~/types'

type PlayedCard = {
  display: string
  place: number
  value: number
}

export default defineComponent({
  components: {
    PlayerCard, TypeSelector, draggable,
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
    // Cards of client player
    const otherCards = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]) // Simple number array for other player cards
    // Simple single space array for holding player cards, has to be array for draggable
    const instanceOfCard = (object: any): object is ICard => {
      return 'display' in object
    }
    const playerPlayedCard = ref<ICard[]>([])
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
    const getOtherCardOffset = (i: number): any => {
      return {
        top: `${-10 + 9 * i}%`,
      }
    }

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
      otherPlayedCards.value = cards
    })
    const pointsRed = ref(0)
    const pointsBlue = ref(0)
    const stichRed = computed(() => pointsRed.value > 0)
    const stichBlue = computed(() => pointsBlue.value > 0)
    socket.on('score', (score: { teamA: number; teamB: number }) => {
      pointsRed.value = pointsRed.value + score.teamB
      pointsBlue.value = pointsBlue.value + score.teamA
    })
    socket.on('clearboard', () => {
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
    useBoardConnection(socket, playerCards)

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
      boardPlayers, playerCards, backupPlayerHand, otherCards, playerPlayedCard, otherPlayedCards, getRightPlayedCard, getTopPlayedCard, getLeftPlayedCard, stichRed, stichBlue, pointsRed, pointsBlue, showPicker, onSelectType, selectedTypeName, cardPlayed, getOtherCardOffset, isTurnOfPlayerAtPlace, getLastPlayedValue,
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
      </div>
    </div>
    <div class="bg-darker border-b-2">
      <div class="flex justify-center w-full h-full px-4 py-2">
        <div v-for="i in otherCards" :key="i" class="h-full card-wrapper">
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
      </div>
    </div>
    <div class="bg-dark border-r-2 min-h-0">
      <div class="h-full flex flex-col relative py-22">
        <svg
          v-for="i in otherCards"
          :key="i"
          class="w-40 transform rotate-90 absolute left-11"
          :style="getOtherCardOffset(i)"
          viewBox="0 0 169 245"
        >
          <use :href="`/images/svg-cards.svg#back`" fill="#384d82" />
        </svg>
      </div>
    </div>
    <div class="field grid px-5">
      <div class="w-full h-full field-sb p-4 flex items-start">
        <svg v-if="stichRed" class="h-44" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#back`" fill="#6f1a5f" />
        </svg>
      </div>
      <div class="w-full h-full field-player field-pr1">
        <svg v-if="getTopPlayedCard" class="h-64" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#${getTopPlayedCard}`" />
        </svg>
      </div>
      <div class="w-full h-full field-type text-white flex flex-col items-center">
        <div>
          <span class="uppercase text-3xl">{{ selectedTypeName }}</span>
        </div>
        <div class="text-2xl mt-2">
          <span class="text-purple-800">{{ pointsRed }}</span> /
          <span class="text-blue-900">{{ pointsBlue }}</span>
        </div>
      </div>
      <div class="w-full h-full field-player field-pb2 flex items-center justify-center">
        <svg v-if="getRightPlayedCard" class="h-64 transform rotate-90" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#${getRightPlayedCard}`" />
        </svg>
      </div>
      <draggable
        v-model="playerPlayedCard"
        class="w-full h-full field-player field-pr2 playable flex items-center justify-center"
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
      <div class="w-full h-full field-player field-pb1 flex items-center justify-center">
        <svg v-if="getLeftPlayedCard" class="h-64 transform rotate-90" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#${getLeftPlayedCard}`" />
        </svg>
      </div>
      <div class="w-full h-full field-sr flex items-end justify-end p-4">
        <svg v-if="stichBlue" class="h-44" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#back`" fill="#384d82" />
        </svg>
      </div>
    </div>
    <div class="bg-dark border-l-2 relative">
      <div class="h-full flex flex-col relative py-22">
        <svg
          v-for="i in otherCards"
          :key="i"
          class="w-40 transform rotate-90 absolute left-11"
          :style="getOtherCardOffset(i)"
          viewBox="0 0 169 245"
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
          <div class="h-full card-wrapper">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="`/images/svg-cards.svg#${element.display}`" />
            </svg>
          </div>
        </template>
      </draggable>
    </div>
    <div class="bg-darker border-t-2">
      <div class="flex flex-col h-full p-3 items-center">
        <PlayerCard
          :in-board="true"
          :player="boardPlayers[0]"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[0].place"
        />
      </div>
    </div>
  </div>
  <transition name="fade">
    <TypeSelector v-if="showPicker" @selected="onSelectType" />
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

.field {
  align-self: center;
  grid-template-columns: 270px auto 200px auto 270px;
  grid-template-rows: 270px 200px 270px;
  grid-template-areas:
    "stichB fill pr1 fill2 type"
    "pb1 fill5 middle fill7 pb2"
    "empty fill3 pr2 fill4 stichR";
}

.field-sb {
  grid-area: stichB;
}
.field-sr {
  grid-area: stichR;
}
.field-type {
  grid-area: type;
}
.field-player {
  border: 3px solid;
}
.field-pr1 {
  @apply bg-cool-gray-700;
  grid-area: pr1;
}
.field-pr2 {
  @apply bg-cool-gray-700;
  grid-area: pr2;
}
.field-pb1 {
  @apply bg-cool-gray-600;
  grid-area: pb1;
}
.field-pb2 {
  @apply bg-cool-gray-600;
  grid-area: pb2;
}

.card-wrapper {
  width: 162px;
  position: relative;
}

.invalid::after {
  opacity: 0.5;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 11px;
  background: #d02655;
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
