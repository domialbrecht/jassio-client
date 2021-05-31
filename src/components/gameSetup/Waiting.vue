<script lang="ts">
import { Socket } from 'socket.io-client'
import draggable from 'vuedraggable'
import { ref, defineComponent, PropType, inject, computed } from 'vue'
import PlayerCard from '../helpers/PlayerCard.vue'
import { IPlayer, IHostSetting, ITeamSlots } from '~/types'
export default defineComponent({
  components: {
    PlayerCard, draggable,
  },
  props: {
    jkey: { type: String, default: '' },
    isHost: { type: Boolean, default: false },
    players: { type: Array as PropType<Array<IPlayer>>, required: true },
    playerSlots: { type: Object as PropType<ITeamSlots>, required: true },
    hostSettings: { type: Object as PropType<IHostSetting>, required: true },
  },
  emits: ['start'],
  setup(props, { emit }) {
    const socket: Socket = inject('socket')!
    const nonHostPlayers = computed(() => props.players.slice(1))
    const instanceOfPlayer = (object: any): object is IPlayer => {
      return 'place' in object
    }
    const playerSwitched = (evt: any) => {
      if (!evt.added || !evt.added.element || !instanceOfPlayer(evt.added.element)) return
      const player = evt.added.element as IPlayer
      socket.emit('playerteamchange', player.id, )
    }
    const copyKey = () => {
      navigator.clipboard.writeText(props.jkey)
    }
    const winAmount = ref(props.hostSettings.winAmount)
    const enableWise = ref(props.hostSettings.enableWise)
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
      copyKey, winAmount, enableWise, settingChanged, onStart, nonHostPlayers, playerSwitched,
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
      <label for="checkbox" class="text-3xl mr-6">Wise isch erloubt</label>
      <input
        id="checkbox"
        v-model="enableWise"
        :disabled="!isHost"
        type="checkbox"
        class="h-6 w-6 bg-white block appearance-none justify-self-center checked:bg-highlight"
        @change="settingChanged"
      />
    </div>
    <div class="grid grid-cols-4 gap-12">
      <div class="flex flex-col items-center">
        <PlayerCard :player="players[0]" />
      </div>
      <draggable
        v-model="nonHostPlayers"
        class="flex flex-col items-center"
        tag="div"
        ghost-class="ghost-player"
        item-key="id"
        @change="playerSwitched"
      >
        <template #item="{ element }">
          <PlayerCard :player="element" />
        </template>
      </draggable>
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
        class="cursor-pointer heroButton px-8 py-3 text-2xl text-white relative tracking-widest bg-highlight hover:bg-contrast uppercase uppercase"
        @click="onStart"
      >Starte</button>
    </div>
    <div v-else>
      <h3 class="text-3xl">Der Host wrid z game starte</h3>
    </div>
  </div>
</template>
