<template>
  <Header :show-background="true" />
  <main>
    <div class="flex items-center h-full relative">
      <div class="container mt-10 mx-auto">
        <div class="mb-2">
          <h2 class="text-2xl mb-4">
            Profile
          </h2>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
