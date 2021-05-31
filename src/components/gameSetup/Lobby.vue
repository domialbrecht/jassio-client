<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, inject, onBeforeMount } from 'vue'
import Entry from './Entry.vue'
import Waiting from './Waiting.vue'
import { IPlayer, IHostSetting, ITeamSlots } from '~/types'

export default defineComponent({
  components: {
    Entry, Waiting,
  },
  props: {
    jkey: { type: String, default: '' },
  },
  emits: ['gstart'],
  setup(props, { emit }) {
    const clientIsHost = ref(false)
    const joinKey = ref('')
    const nameInput = ref('')
    const p: IPlayer[] = []
    const players = ref(p)
    const playerSlots = ref<ITeamSlots>({
      r1: undefined,
      r2: undefined,
      b1: undefined,
      b2: undefined,
    })
    const assignPlayerSlots = () => {
      players.value.forEach((p) => {
        playerSlots.value[p.place] = p.id
      })
    }
    const hostSettings = ref<IHostSetting>({
      winAmount: 1000,
      enableWise: true,
    })
    const socket: Socket = inject('socket')!
    const setupComplete = ref(false)
    onBeforeMount(() => { if (props.jkey) joinKey.value = props.jkey })
    // onMounted(() => { mounted = true })
    // onBeforeUnmount(() => { mounted = false })
    const serverConnect = (username: string, host: boolean, key: string, place: string) => {
      socket.auth = { username, host, key, place }
      socket.connect()
    }
    const onHost = (name: string) => {
      clientIsHost.value = true
      nameInput.value = name
      serverConnect(name, clientIsHost.value, '', 'r1')
    }
    const onJoin = (name: string) => {
      if (joinKey.value) {
        const initalPlace = playerSlots.value.r2 ? 'r2' : playerSlots.value.b1 ? 'b1' : 'b2'
        nameInput.value = name
        console.log(`name: ${name}`)
        serverConnect(name, false, joinKey.value, initalPlace)
      }
    }
    const onStart = () => {
      // FIXME: ENABLE if (players.value.length < 4) return
      if (clientIsHost.value)
        socket.emit('startGame')
    }
    socket.on('started', () => {
      emit('gstart', players)
    })
    socket.on('hosted', (key: string) => {
      joinKey.value = `${window.location.origin}/game?key=${key}`
      socket.emit('settingChanged', { winAmount: hostSettings.value.winAmount, enableWise: hostSettings.value.enableWise })
    })
    socket.on('players', (sp) => {
      const newPlayers = sp.map((p: { id: any; name: any; isHost: any; place: any }) => {
        return {
          self: socket.id === p.id,
          isHost: p.isHost,
          id: p.id,
          name: p.name,
          place: p.place,
        }
      })
      assignPlayerSlots()
      players.value = newPlayers
      setupComplete.value = true
    })
    socket.on('initialSettings', (settings) => {
      hostSettings.value.winAmount = settings.winAmount
      hostSettings.value.enableWise = settings.enableWise
    })
    socket.on('abandoned', () => {
      nameInput.value = ''
      players.value = []
      joinKey.value = ''
      setupComplete.value = false
    })
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        nameInput.value = ''
        players.value = []
      }
    })
    return {
      joinKey, nameInput, players, playerSlots, assignPlayerSlots, setupComplete, onHost, onJoin, clientIsHost, hostSettings, onStart,
    }
  },
})
</script>

<template>
  <div class="flex items-center h-full relative">
    <div class="absolute w-16 h-16 bg-contrast top-20"></div>
    <div class="absolute w-16 h-16 bg-deep right-0 top-80"></div>
    <div class="absolute w-16 h-16 bg-contrast bottom-80"></div>
    <div class="absolute w-16 h-16 bg-deep right-0 bottom-20"></div>
    <div class="container bg-dark text-white h-4/5 mx-auto" :style="{ borderRadius: '40px' }">
      <Entry v-if="!setupComplete" :jkey="joinKey" @host="onHost" @join="onJoin" />
      <Waiting
        v-else
        :is-host="clientIsHost"
        :jkey="joinKey"
        :players="players"
        :player-slots="playerSlots"
        :host-settings="hostSettings"
        @start="onStart"
      />
    </div>
  </div>
</template>
