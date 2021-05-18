<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, inject, onBeforeMount } from 'vue'
import Entry from './Entry.vue'
import Waiting from './Waiting.vue'
import { IPlayer, IHostSetting } from '~/types'

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
    const hostSettings = ref<IHostSetting>({
      winAmount: 1000,
      enableWise: true,
    })
    const socket: Socket = inject('socket')!
    const setupComplete = ref(false)
    onBeforeMount(() => { if (props.jkey) joinKey.value = props.jkey })
    // onMounted(() => { mounted = true })
    // onBeforeUnmount(() => { mounted = false })
    const serverConnect = (username: string, host: boolean, key: string) => {
      socket.auth = { username, host, key }
      socket.connect()
    }
    const onHost = (name: string) => {
      clientIsHost.value = true
      nameInput.value = name
      serverConnect(name, clientIsHost.value, '')
    }
    const onJoin = (name: string) => {
      if (joinKey.value) {
        nameInput.value = name
        console.log(`name: ${name}`)
        serverConnect(name, false, joinKey.value)
      }
    }
    const onStart = () => {
      // FIXME: ENABLE if (players.value.length < 4) return
      if (clientIsHost.value)
        socket.emit('startGame')
    }
    socket.on('started', () => {
      emit('gstart', players.value)
    })
    socket.on('hosted', (key: string) => {
      joinKey.value = `${window.location.origin}/game?key=${key}`
      socket.emit('settingChanged', { winAmount: hostSettings.value.winAmount, enableWise: hostSettings.value.enableWise })
    })
    socket.on('players', (sp) => {
      const newPlayers = sp.map((p: { id: any; name: any; isHost: any }, i: number) => {
        return {
          self: socket.id === p.id,
          isHost: p.isHost,
          id: p.id,
          name: p.name,
          teamRed: i > 1,
        }
      })
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
      joinKey, nameInput, players, setupComplete, onHost, onJoin, clientIsHost, hostSettings, onStart,
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
        :host-settings="hostSettings"
        @start="onStart"
      />
    </div>
  </div>
</template>
