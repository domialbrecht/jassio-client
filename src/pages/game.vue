<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Lobby from '~/components/gameSetup/Lobby.vue'
import Board from '~/components/gameRunning/Board.vue'
import socket from '~/lib/socket'
const router = useRouter()
const leaveGame = () => {
  if (confirm('Spiu verlah?'))
    router.push('/')
}
onMounted(() => console.log('game mount'))
onUnmounted(() => { console.log('game unmount'); socket.off('connect_error'); socket.disconnect() })
let key = ''
const k = new URLSearchParams(window.location.search).get('key')
if (k && typeof k === 'string')
  key = k

const gameRunning = ref(true) // FIXME: TESTING
provide('socket', socket)
</script>

<template>
  <header class="absolute h-10 bg-dark w-full flex items-center px-5 justify-between text-white">
    <span class="pointer" @click="leaveGame">LEAVE</span>
    <router-link to="/">HELP</router-link>
  </header>
  <main class="pt-10 h-full">
    <Lobby v-if="!gameRunning" :jkey="key" />
    <Board v-else />
  </main>
</template>

<route lang="yaml">
meta:
  layout: gamelayout
</route>
