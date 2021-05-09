<script setup lang="ts">
import { ref } from 'vue'
import Lobby from '../components/gameSetup/Lobby.vue'
import Board from '../components/gameRunning/Board.vue'
const gameRunning = ref(false)
</script>

<template>
  <Lobby v-if="!gameRunning" />
  <Board v-else />
</template>

<route lang="yaml">
meta:
  layout: game
</route>
