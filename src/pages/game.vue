<script setup lang="ts">
import { ref, provide } from 'vue'
import Lobby from '../components/gameSetup/Lobby.vue'
import Board from '../components/gameRunning/Board.vue'
import socket from '../lib/socket'
const gameRunning = ref(false)
provide('socket', socket)
</script>

<template>
  <Lobby v-if="!gameRunning" />
  <Board v-else />
</template>

<route lang="yaml">
meta:
  layout: game
</route>
