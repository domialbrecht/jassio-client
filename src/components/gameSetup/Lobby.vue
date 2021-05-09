<script lang="ts">
import { ref, defineComponent } from 'vue'
import Entry from './Entry.vue'
import Waiting from './Waiting.vue'

export default defineComponent({
  components: {
    Entry, Waiting,
  },
  setup() {
    const setupComplete = ref(false)
    return {
      setupComplete,
    }
  },
})
</script>

<template>
  <div class="flex items-center h-full relative">
    <div class="absolute w-16 h-16 bg-contrast top-20"></div>
    <div class="absolute w-16 h-16 bg-deep right-0 top-80"></div>
    <div class="absolute w-16 h-16 bg-contrast bottom-80"></div>
    <div class="absolute w-16 h-16 bg-deep right-0 bottom-20"></div>
    <div class="container bg-dark text-white h-4/5 mx-auto" :style="{ borderRadius: '40px' }">
      <Entry v-if="!setupComplete" msg="test" />
      <Waiting v-else />
    </div>
  </div>
</template>
