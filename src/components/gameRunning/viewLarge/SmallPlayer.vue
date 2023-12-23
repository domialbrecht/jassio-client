<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import PlayerCard from '~/components/helpers/PlayerCard.vue'
import type { IPlayer } from '~/types'

const props = defineProps({
  final: {
    type: Boolean,
    required: false,
    default: false
  },
  player: {
    type: Object as PropType<IPlayer>,
    required: true
  },
  wisvalues: {
    type: Array as PropType<Array<number>>,
    required: true
  },
  isTurnOfPlayerAtPlace: {
    type: Number,
    required: true
  }
})
</script>
<template>
  <PlayerCard
    :in-board="true"
    :tiny="true"
    :name="props.player.name"
    :highlight="props.isTurnOfPlayerAtPlace === player.place"
  />
  <div
    v-if="props.wisvalues.length > 0"
    class="flex flex-col"
    :class="props.final ? 'text-green-300' : 'text-highlight'"
  >
    <span v-for="v in props.wisvalues" :key="v" class="text-lg">{{ v }}</span>
  </div>
</template>
