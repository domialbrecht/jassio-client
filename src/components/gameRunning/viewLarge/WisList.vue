<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
const props = defineProps({
  final: {
    type: Boolean,
    required: false,
    default: false
  },
  value: {
    type: Array as PropType<Array<number>>,
    required: true
  }
})
</script>
<template>
  <div v-for="v in props.value" :key="v" class="flex absolute right-4 gap-3">
    <div class="rounded-1 p-2" :class="final ? 'bg-green-300' : 'bg-highlight'">
      {{ v }}
    </div>
  </div>
</template>
