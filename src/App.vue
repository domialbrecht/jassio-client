<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onUnmounted } from 'vue'
import socket from '~/api/socket'

onUnmounted(() => socket.off('connect_error'))

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Interism Jass',
  meta: [{ name: 'description', content: 'Jasse Online' }]
})
</script>

<template>
  <router-view />
</template>
