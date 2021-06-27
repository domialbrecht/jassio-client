<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
})
</script>
<template>
  <div v-if="props.value > 0" class="flex absolute right-4 gap-3">
    <div class="bg-highlight rounded-1 p-2">
      {{ props.value }}
    </div>
  </div>
</template>
