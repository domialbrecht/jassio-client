<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import Board from './viewLarge/Board.vue'
import type { IPlayer } from '~/types'

const props = defineProps({
  players: {
    type: Array as PropType<Array<IPlayer>>,
    required: false,
    default: false
  }
})

// ==============================
// Determine which board version to show for different device sizes
// This is easier to manage, due to many changes view necesarry
// ==============================
// const boardView = window.innerWidth > 900 ? (window.innerWidth > 1150 ? 0 : 1) : 2
</script>
<template>
  <div class="h-full w-full">
    <Board :players="props.players" />
  </div>
</template>
