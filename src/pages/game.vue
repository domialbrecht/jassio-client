<script lang="ts">
import { ref, provide, onMounted, onUnmounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { IPlayer } from '~/types'
import Lobby from '~/components/gameSetup/Lobby.vue'
import Boardwrapper from '~/components/gameRunning/BoardWrapper.vue'
import socket from '~/api/socket'
export default defineComponent({
  components: {
    Lobby,
    Boardwrapper
  },
  setup() {
    const router = useRouter()
    const leaveGame = () => {
      if (confirm('Spiu verlah?')) router.push('/')
    }

    let key = ''
    const k = new URLSearchParams(window.location.search).get('key')
    if (k && typeof k === 'string') key = k

    onMounted(() => console.log('game mount'))
    onUnmounted(() => {
      console.log('game unmount')
      socket.off('connect_error')
      socket.disconnect()
    })

    const gameRunning = ref(false)
    const p: IPlayer[] = []
    const players = ref(p)
    const onStart = (pl: IPlayer[]) => {
      players.value = pl
      gameRunning.value = true
    }
    socket.on('connect_error', () => {
      gameRunning.value = false
      router.push('/')
    })
    socket.on('abandoned', () => {
      gameRunning.value = false
      router.push('/')
    })
    socket.on('win', () => {
      gameRunning.value = false
      router.push('/')
    })
    provide('socket', socket)
    return {
      leaveGame,
      key,
      onStart,
      gameRunning,
      players
    }
  }
})
</script>

<template>
  <header
    class="absolute h-10 bg-gray-900 gradient-main w-full flex items-center px-5 justify-between text-white"
  >
    <span class="pointer" @click="leaveGame">LEAVE</span>
    <router-link to="/"> HELP </router-link>
  </header>
  <main class="pt-10 h-full">
    <Lobby v-if="!gameRunning" :jkey="key" @gstart="onStart" />
    <Boardwrapper v-else :players="players" />
  </main>
</template>
