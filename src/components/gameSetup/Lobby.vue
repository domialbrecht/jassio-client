<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, inject, onBeforeMount } from 'vue'
import Entry from './Entry.vue'
import Waiting from './Waiting.vue'
import { IPlayer, IHostSetting } from '~/types'

export default defineComponent({
  components: {
    Entry,
    Waiting
  },
  props: {
    jkey: { type: String, default: '' }
  },
  emits: ['gstart'],
  setup(props, { emit }) {
    const clientIsHost = ref(false)
    const joinKey = ref('')
    const nameInput = ref('')
    const p: IPlayer[] = []
    const players = ref(p)
    const hostSettings = ref<IHostSetting>({
      winAmount: 200,
      enableWise: true
    })
    const socket: Socket = inject('socket')!
    const setupComplete = ref(false)
    onBeforeMount(() => {
      if (props.jkey) joinKey.value = props.jkey
    })
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
      if (clientIsHost.value) socket.emit('startGame')
    }
    socket.on('started', () => {
      emit('gstart', players.value)
    })
    socket.on('hosted', (key: string) => {
      joinKey.value = `${window.location.origin}/game?key=${key}`
      socket.emit('settingChanged', {
        winAmount: hostSettings.value.winAmount,
        enableWise: hostSettings.value.enableWise
      })
    })
    socket.on('players', (sp) => {
      const newPlayers = sp.map((p: { id: any; name: any; isHost: any; place: any }) => {
        return {
          self: socket.id === p.id,
          isHost: p.isHost,
          id: p.id,
          name: p.name,
          place: p.place
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
      joinKey,
      nameInput,
      players,
      setupComplete,
      onHost,
      onJoin,
      clientIsHost,
      hostSettings,
      onStart
    }
  }
})
</script>

<template>
  <div class="flex items-center h-full relative">
    <div class="absolute animate-wiggle text-contrast text-7xl left-2 2xl:left-8 top-20">
      <span>♥</span>
    </div>
    <div class="absolute animate-wiggle text-deep right-2 2xl:right-8 text-7xl top-80">
      <span>♠</span>
    </div>
    <div class="absolute animate-wiggle text-contrast text-7xl left-2 2xl:left-8 bottom-80">
      <span>♦️</span>
    </div>
    <div class="absolute animate-wiggle text-deep right-2 2xl:right-8 text-7xl bottom-20">
      <span>♣️</span>
    </div>
    <div class="container bg-blue-900 text-white h-4/5 mx-auto rounded-[40px]">
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
<style>
.bgEntry {
  background-image: radial-gradient(circle, #163e94 1%, #131952 99%);
}
</style>
