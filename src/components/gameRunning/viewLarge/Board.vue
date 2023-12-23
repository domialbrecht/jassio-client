<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, PropType, inject } from 'vue'
import draggable from 'vuedraggable'
import useCardFunctions from '../logic/cardHandler'
import useTurnFunctions from '../logic/turnHandler'
import useScoreFunctions from '../logic/scoreHandler'
import useWisFunctions from '../logic/wisHandler'
import WisList from './WisList.vue'
import WisSelector from './WisSelector.vue'
import TypeSelector from './TypeSelector.vue'
import SmallPlayer from './SmallPlayer.vue'
import Finished from './Finished.vue'
import PlayerCard from '~/components/helpers/PlayerCard.vue'
import { IPlayer } from '~/types'

export default defineComponent({
  components: {
    PlayerCard,
    TypeSelector,
    WisSelector,
    WisList,
    draggable,
    SmallPlayer,
    Finished
  },
  props: {
    players: { type: Array as PropType<Array<IPlayer>>, required: true }
  },
  setup(props) {
    // ==============================
    // ==============================
    // Socket instance
    // ==============================
    const socket: Socket = inject('socket')!
    // ==============================

    // ==============================
    // Sync player places with server
    // ==============================
    const shiftPlayers = (a: IPlayer[], amount: number) => {
      if (a.length < 1) return a
      for (let index = 0; index < amount; index++) a.push(a.shift()!)
      return a
    }
    const boardPlayers = ref<IPlayer[]>([])
    const self = props.players.find((p) => p.self)
    const selfPlace = self?.place
    boardPlayers.value = shiftPlayers([...props.players], selfPlace || 0)
    // ==============================

    // ==============================
    // Load use-functions
    // ==============================
    // Card server functions
    const {
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
    } = useCardFunctions(socket, self, boardPlayers.value)
    // Wis fnctions
    const {
      selectCard,
      selectedCards,
      wisDeclarelist,
      getCardClasses,
      getCardWisid,
      onSelectWis,
      sendWis,
      getWiseByPlace,
      wiseAreFinal,
      tempPointsRed,
      tempPointsBlue
    } = useWisFunctions(socket, self, selfCanPlay, playerCards)
    // Updating and displaying scores
    const { pointsRed, pointsBlue, stichRed, stichBlue, winnerTeam } = useScoreFunctions(socket)
    // For selecting turn types and moving turns
    const { selectedTypeName, showPicker, isSwitch, onSelectType } = useTurnFunctions(socket)
    // ==============================

    // ==============================
    // General socket handlers
    // ==============================
    socket.on('clearboard', () => {
      otherPlayedCards.value = []
      playerPlayedCard.value = []
    })
    // ==============================

    // ==============================
    // Player card functions
    // ==============================
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
    // ==============================

    return {
      // View
      // Board and Places
      boardPlayers,
      playerCards,
      backupPlayerHand,
      playerPlayedCard,
      otherPlayedCards,
      getRightPlayedCard,
      getTopPlayedCard,
      getLeftPlayedCard,
      // Score
      stichRed,
      stichBlue,
      pointsRed,
      pointsBlue,
      winnerTeam,
      // Select
      showPicker,
      onSelectType,
      isSwitch,
      // Cards
      cardPlayed,
      getOtherCardOffset,
      isTurnOfPlayerAtPlace,
      getLastPlayedValue,
      playerRightPlayedAmount,
      playerTopPlayedAmount,
      playerLeftPlayedAmount,
      // Wise
      selectedTypeName,
      selectCard,
      selectedCards,
      wisDeclarelist,
      getCardClasses,
      getCardWisid,
      onSelectWis,
      sendWis,
      getWiseByPlace,
      wiseAreFinal,
      tempPointsRed,
      tempPointsBlue
    }
  }
})
</script>
<template>
  <div v-if="boardPlayers.length === 4" class="grid h-full board bg-gray-900 overflow-hidden">
    <div class="bg-darker border-b-2">
      <div class="transform -rotate-180 flex flex-col h-full p-3 items-center">
        <PlayerCard
          v-if="boardPlayers[2]"
          :in-board="true"
          :name="boardPlayers[2].name"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[2].place"
        />
        <WisList :final="wiseAreFinal" :value="getWiseByPlace(boardPlayers[2].place)" />
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
          v-if="boardPlayers[1]"
          :in-board="true"
          :name="boardPlayers[1].name"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[1].place"
        />
        <WisList :final="wiseAreFinal" :value="getWiseByPlace(boardPlayers[1].place)" />
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
    <div class="showSmall field relative h-full">
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
          <span class="text-purple-800">{{ pointsRed }}</span>
          <span v-if="tempPointsRed > 0" class="text-gray-400">{{ ` (+${tempPointsRed})` }}</span> /
          <span class="text-blue-900">{{ pointsBlue }}</span>
          <span v-if="tempPointsBlue > 0" class="text-gray-400">{{ ` (+${tempPointsBlue})` }}</span>
        </div>
      </div>
      <div class="field-players players-blue">
        <div class="field-player field-pb1 bg-gray-600">
          <svg v-if="getTopPlayedCard" class="h-full" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#${getTopPlayedCard}`" />
          </svg>
        </div>
        <draggable
          v-model="playerPlayedCard"
          class="field-player field-pb2 playable bg-gray-600"
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
        <div class="field-player field-pr1 bg-gray-600">
          <svg v-if="getLeftPlayedCard" class="h-full" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#${getLeftPlayedCard}`" />
          </svg>
        </div>
        <div class="field-player field-pr2 bg-gray-600">
          <svg v-if="getRightPlayedCard" class="h-full" viewBox="0 0 169 245">
            <use :href="`/images/svg-cards.svg#${getRightPlayedCard}`" />
          </svg>
        </div>
      </div>
      <div class="hideLarge absolute mt-2 left-5">
        <div class="flex gap-4">
          <div v-for="player in boardPlayers" :key="player.id" class="flex flex-col items-center">
            <SmallPlayer
              :player="player"
              :final="wiseAreFinal"
              :wisvalues="getWiseByPlace(player.place)"
              :is-turn-of-player-at-place="isTurnOfPlayerAtPlace"
            />
          </div>
        </div>
      </div>
      <div
        class="hideLarge absolute mt-2 bottom-2 right-5 text-2xl"
        :class="isTurnOfPlayerAtPlace === boardPlayers[0].place ? 'text-highlight' : 'text-white'"
      >
        {{ boardPlayers[0].name }}
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
          v-if="boardPlayers[3]"
          :in-board="true"
          :name="boardPlayers[3].name"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[3].place"
        />
        <WisList :final="wiseAreFinal" :value="getWiseByPlace(boardPlayers[3].place)" />
      </div>
    </div>
    <div class="showSmall bg-darker border-t-2">
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
            :data-wisid="getCardWisid(element)"
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
          v-if="boardPlayers[0]"
          :in-board="true"
          :name="boardPlayers[0].name"
          :highlight="isTurnOfPlayerAtPlace === boardPlayers[0].place"
        />
        <WisList :final="wiseAreFinal" :value="getWiseByPlace(boardPlayers[0].place)" />
      </div>
    </div>
  </div>
  <transition name="fade">
    <TypeSelector v-if="showPicker" :hideswitch="isSwitch" @selected="onSelectType" />
  </transition>
  <transition name="fade">
    <WisSelector
      v-if="selectedCards.length > 0 || wisDeclarelist.length > 0"
      @selected="onSelectWis"
      @send="sendWis"
    />
  </transition>
  <transition name="fade">
    <Finished
      v-if="winnerTeam !== undefined"
      :host-place="boardPlayers[0].place"
      :team="winnerTeam"
    />
  </transition>
</template>
<style scoped>
.board {
  grid-template-rows: auto 250px;
}

@media (max-width: 1800px), (max-height: 999px) {
  .board > div:not(.showSmall) {
    display: none;
  }
}

@media (min-width: 1801px) and (min-height: 1000px) {
  .board {
    grid-template-columns: 250px auto 250px;
    grid-template-rows: 250px auto 250px;
    grid-template-areas:
      'player1Icon player1Hand player2Icon'
      'player4Hand board player2Hand'
      'player4Icon player3Hand player3Icon';
  }
  .hideLarge {
    display: none;
  }
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
  align-self: center;
  width: calc(177px * 0.8);
  height: calc(256px * 0.8);
  border-radius: 8px;
  @media (min-width: 1801px) and (min-height: 1100px) {
    width: auto;
    height: auto;
    min-width: 177px;
    min-height: 256px;
    border-radius: 8px;
  }
}

.playable {
  min-width: 177px;
  min-height: 256px;
  border-radius: 8px;
}

.field-info {
  right: 20px;
}

.field-sr {
  top: 50%;
  left: 30%;
  transform: translateY(-50%);
  @media (min-width: 1801px) and (min-height: 1100px) {
    transform: none;
    top: 5px;
    left: 5px;
  }
}

.field-sb {
  top: 50%;
  right: 30%;
  transform: translateY(-50%);
  @media (min-width: 1801px) and (min-height: 1100px) {
    top: auto;
    transform: none;
    right: 5px;
    bottom: 5px;
  }
}

.card-wrapper {
  width: calc(162px * 0.8);
  @media (min-width: 1480px) and (min-height: 1100px) {
    width: 162px;
  }
  position: relative;
  transition: all 0.3s;
}

.card-wrapper[data-wisid]::after,
.invalid::after {
  opacity: 0.5;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 98%;
  height: 100%;
  border-radius: 11px;
}

.card-wrapper[data-wisid='1']::after {
  background: #93c5fd;
}

.card-wrapper[data-wisid='2']::after {
  background: #6ee7b7;
}

.card-wrapper[data-wisid='3']::after {
  background: #fcd34d;
}

.card-wrapper[data-wisid='4']::after {
  background: #c4b5fd;
}

.invalid::after {
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
