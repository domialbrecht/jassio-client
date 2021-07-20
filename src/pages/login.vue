<template>
  <Header :show-background="true" />
  <main>
    <div class="flex items-center h-full relative">
      <div class="container mt-10 bg-blue-900 text-white h-4/5 mx-auto rounded-[40px]">
      </div>
    </div>
  </main>
  <Footer />
</template>
<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
