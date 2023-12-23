<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  loading: {
    type: Boolean,
    required: true
  },
  value: {
    type: Number,
    required: false
  },
  label: {
    type: String,
    required: false
  }
})
</script>
<template>
  <span v-if="props.loading">Loading</span>
  <span v-else>{{ value }}{{ label ? ` ${label}` : '' }}</span>
</template>
