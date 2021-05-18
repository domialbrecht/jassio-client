<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, PropType, inject } from 'vue'
import PlayerCard from '../helpers/PlayerCard.vue'
import { IPlayer } from '~/types'

interface Card {
  id: number
  display: string
  value: number
  suit: 'heart' | 'diamond' | 'spade' | 'club'
}

export default defineComponent({
  components: {
    PlayerCard,
  },
  props: {
    players: { type: Array as PropType<Array<IPlayer>>, required: true },
  },
  setup(props, { emit }) {
    const socket: Socket = inject('socket')!
    // Empty player if boardPlayers are undef
    const emptyPlayer: IPlayer = {
      self: false,
      isHost: false,
      id: '',
      name: 'string',
      teamRed: false,
    }
    // Map players from props to each side for easy access
    const boardPlayers = new Map([
      ['top', props.players.find(p => !p.teamRed && !p.self)],
      ['right', props.players.filter(p => p.teamRed)[0]],
      ['bottom', props.players.find(p => p.self)],
      ['left', props.players.filter(p => p.teamRed)[1]],
    ])

    const playerCards = ref<Card[]>([]) // Cards of client player
    const otherCards = ref([]) // Simple number array for other player cards
    const playedCards = ref({
      r1: { id: 0, display: '', value: 0, suit: 'heart' },
      b1: { id: 0, display: '', value: 0, suit: 'heart' },
      r2: { id: 0, display: '', value: 0, suit: 'heart' },
      b2: { id: 0, display: '', value: 0, suit: 'heart' },
    }) // Container for cards in pot
    const tempHand = playerCards.value // Copy of client hand to reset after drag end

    const stichRed = ref(false) // If at least one stich red to show card back
    const stichBlue = ref(false) // If at least one stich blue to show card back

    const dragCard = ref({ id: 0, display: '', value: 0, suit: 'heart' }) // Var for dragged card info
    const dragActive = ref(false) // Helper for class to prevent effects while drag
    const startDrag = (evt: DragEvent, card: Card) => {
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
      console.log('drop')
      console.log(evt)
    }
    const allowDrop = (evt: DragEvent) => {
      evt.preventDefault()
    }
    const handleDragEnd = (evt: DragEvent, card: Card) => {
      console.log('dragend')
      if (evt.dataTransfer?.dropEffect === 'none') {
        dragActive.value = false
        dragCard.value = card
        playerCards.value = tempHand
      }
    }

    socket.on('getCards', (cards) => {
      playerCards.value = cards
    })

    return {
      playerCards, otherCards, playedCards, tempHand, stichRed, stichBlue, startDrag, handleDrop, allowDrop, handleDragEnd, boardPlayers, emptyPlayer, dragActive,
    }
  },
})

</script>
<template>
  <div class="grid h-full board bg-blue-gray-900 overflow-hidden">
    <div class="bg-darker border-b-2">
      <div
        v-if="boardPlayers.get('top')"
        class="transform -rotate-180 flex flex-col h-full p-3 items-center"
      >
        <PlayerCard :in-board="true" :player="boardPlayers.get('top') || emptyPlayer" />
      </div>
    </div>
    <div class="bg-darker border-b-2">
      <div class="flex justify-center w-full h-full px-4 py-2">
        <div
          v-for="i in otherCards"
          :key="i"
          class="flex justify-center items-center w-full otherCard"
          :class="i % 2 ? 'bg-red-400' : 'bg-red-600'"
        >
          <span class="transform -rotate-180 text-3xl text-white">{{ i }}</span>
        </div>
      </div>
    </div>
    <div class="bg-dark border-l-2">
      <div
        v-if="boardPlayers.get('right')"
        class="transform -rotate-90 flex flex-col h-full p-3 items-center"
      >
        <PlayerCard :in-board="true" :player="boardPlayers.get('right') || emptyPlayer" />
      </div>
    </div>
    <div class="bg-dark border-r-2">
      <div class="flex justify-center flex-col w-full h-full px-4 py-2">
        <div
          v-for="i in otherCards"
          :key="i"
          class="flex justify-center items-center h-full h-full otherCard"
          :class="i % 2 ? 'bg-blue-400' : 'bg-blue-600'"
        >
          <span class="transform rotate-90 text-3xl text-white">{{ i }}</span>
        </div>
      </div>
    </div>
    <div class="field grid px-5">
      <div class="w-full h-full field-sb p-4 flex items-start">
        <svg v-if="stichRed" class="h-44" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#back`" fill="#6f1a5f" />
        </svg>
      </div>
      <div class="w-full h-full field-player field-pr1"></div>
      <div class="w-full h-full field-type text-white flex flex-col items-center">
        <div>
          <span class="uppercase text-3xl">Obeabe</span>
        </div>
        <div class="text-2xl mt-2">
          <span class="text-purple-800">0</span> /
          <span class="text-blue-900">0</span>
        </div>
      </div>
      <div class="w-full h-full field-player field-pb2"></div>
      <div
        class="w-full h-full field-player field-pr2 playable flex items-center justify-center"
        @dragover="allowDrop($event)"
        @drop="handleDrop($event)"
      >
        <svg v-if="playedCards.r2" class="h-64" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#${playedCards.r2}`" />
        </svg>
      </div>
      <div class="w-full h-full field-player field-pb1"></div>
      <div class="w-full h-full field-sr flex items-end justify-end p-4">
        <svg v-if="stichBlue" class="h-44" viewBox="0 0 169 245">
          <use :href="`/images/svg-cards.svg#back`" fill="#384d82" />
        </svg>
      </div>
    </div>
    <div class="bg-dark border-l-2">
      <div class="flex justify-center flex-col w-full h-full px-4 py-2">
        <div
          v-for="i in otherCards"
          :key="i"
          class="flex justify-center items-center h-full otherCard"
          :class="i % 2 ? 'bg-blue-400' : 'bg-blue-600'"
        >
          <span class="transform -rotate-90 text-3xl text-white">{{ i }}</span>
        </div>
      </div>
    </div>
    <div class="bg-dark border-r-2">
      <div
        v-if="boardPlayers.get('left')"
        class="transform rotate-90 flex flex-col h-full p-3 items-center"
      >
        <PlayerCard :in-board="true" :player="boardPlayers.get('left') || emptyPlayer" />
      </div>
    </div>
    <div class="bg-darker border-t-2">
      <div class="flex justify-center h-full px-4 py-2 hand" :class="dragActive ? 'dragged' : ''">
        <transition-group name="hand">
          <div
            v-for="card in playerCards"
            :key="card.id"
            draggable="true"
            class="h-full card-wrapper"
            @dragstart="startDrag($event, card)"
            @dragend="handleDragEnd($event, card)"
          >
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="`/images/svg-cards.svg#${card.display}`" />
            </svg>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="bg-darker border-t-2">
      <div v-if="boardPlayers.get('bottom')" class="flex flex-col h-full p-3 items-center">
        <PlayerCard :in-board="true" :player="boardPlayers.get('bottom') || emptyPlayer" />
      </div>
    </div>
  </div>
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

.otherCard:hover {
  transition: transform 0.3s;
  transform: scale(1.05);
}

.card-wrapper {
  width: 162px;
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
</style>
