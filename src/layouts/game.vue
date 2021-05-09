<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const leaveGame = () => {
  if (confirm('Spiu verlah?'))
    router.push('/')
}
</script>
<template>
  <header class="absolute h-10 bg-dark w-full flex items-center px-5 justify-between text-white">
    <span class="pointer" @click="leaveGame">LEAVE</span>
    <router-link to="/">HELP</router-link>
  </header>
  <main class="pt-10 px-5 h-full">
    <router-view />
  </main>
</template>
