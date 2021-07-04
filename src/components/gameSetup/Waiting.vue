<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, PropType, inject } from 'vue'
import IconSwap from 'virtual:vite-icons/mdi/swapHorizontal'
import PlayerCard from '../helpers/PlayerCard.vue'
import { IPlayer, IHostSetting } from '~/types'
import { PlayerPlaceholder } from '~/defs'
export default defineComponent({
  components: {
    PlayerCard, IconSwap,
  },
  props: {
    jkey: { type: String, default: '' },
    isHost: { type: Boolean, default: false },
    players: { type: Array as PropType<Array<IPlayer>>, required: true },
    hostSettings: { type: Object as PropType<IHostSetting>, required: true },
  },
  emits: ['start'],
  setup(props, { emit }) {
    const socket: Socket = inject('socket')!
    const copyKey = () => {
      navigator.clipboard.writeText(props.jkey)
    }
    const winAmount = ref(props.hostSettings.winAmount)
    const enableWise = ref(props.hostSettings.enableWise)
    const playerToSwitch = ref<IPlayer>(PlayerPlaceholder)
    const switchInProgress = ref(false)
    const switchPlayer = (p: IPlayer) => {
      if (!switchInProgress.value) {
        playerToSwitch.value = p
        switchInProgress.value = true
        return
      }
      socket.emit('swapplayerteam', playerToSwitch.value.id, p.id)
      switchInProgress.value = false
      playerToSwitch.value = PlayerPlaceholder
    }
    const onStart = () => {
      emit('start')
    }
    const settingChanged = () => {
      socket.emit('settingChanged', { winAmount: winAmount.value, enableWise: enableWise.value })
    }
    socket.on('newSettings', (settings) => {
      winAmount.value = settings.winAmount
      enableWise.value = settings.enableWise
    })
    return {
      copyKey, winAmount, enableWise, settingChanged, onStart, switchPlayer, playerToSwitch,
    }
  },
})

</script>
<template>
  <div class="w-3/4 mx-auto py-16 h-full flex flex-col justify-between items-center">
    <div class="grid grid-cols-2 grid-rows-2 gap-4">
      <span class="text-3xl mr-6">Gwinnpunktzahl</span>
      <input
        v-model="winAmount"
        :disabled="!isHost"
        class="mt-0 block px-0.5 text-darker text-xl text-center border-0 focus:ring-0 focus:border-white"
        @change="settingChanged"
      />
      <label for="checkbox" class="text-3xl mr-6">Wise isch erloubt (WIP)</label>
      <input
        id="checkbox"
        v-model="enableWise"
        :disabled="true"
        type="checkbox"
        class="h-6 w-6 bg-white block appearance-none justify-self-center checked:bg-highlight"
        @change="settingChanged"
      />
    </div>
    <div class="grid grid-cols-4 gap-12">
      <div v-for="(p, i) in players" :key="p.id" class="flex flex-col items-center">
        <PlayerCard :player="p" />
        <div v-if="i > 0 && isHost">
          <IconSwap
            class="text-4xl cursor-pointer"
            :class="playerToSwitch.id === p.id ? 'text-highlight' : ''"
            @click="switchPlayer(p)"
          />
        </div>
      </div>
      <div v-for="n in 4 - players.length" :key="n" class="flex flex-col items-center">
        <div class="mb-5 flex-grow bg-white w-full rounded-full"></div>
        <div>Läär</div>
      </div>
    </div>
    <div v-if="isHost" class="flex justify-between w-full items-center">
      <div>
        <button
          class="px-8 py-3 text-2xl text-white tracking-widest bg-accent hover:bg-skylight uppercase"
          @click="copyKey"
        >Iladig kopiere</button>
      </div>
      <button
        v-if="players.length === 4"
        class="cursor-pointer heroButton px-8 py-3 text-2xl text-white relative tracking-widest bg-highlight hover:bg-contrast uppercase uppercase"
        @click="onStart"
      >Starte</button>
    </div>
    <div v-else>
      <h3 class="text-3xl">Der Host wrid z Spiu starte</h3>
    </div>
  </div>
</template>
