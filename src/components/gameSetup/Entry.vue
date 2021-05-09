<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  props: {
    jkey: { type: String, default: '' },
  },
  emits: ['host', 'join'],
  setup(props, { emit }) {
    const name = ref('')
    const onHost = () => {
      if (!name.value) return
      emit('host', name.value)
    }
    const onJoin = () => {
      emit('join', name.value)
    }
    return { name, onHost, onJoin }
  },
})

</script>
<template>
  <div class="flex items-center justify-between flex-col py-16 h-full">
    <div
      class="bg-white rounded-3xl h-full mb-6 w-1/2 border-highlight border-4 flex justify-center items-center"
    >
      <span class="text-darker">WIP Avatar apasse</span>
    </div>
    <div class="flex items-center flex-col w-1/2">
      <div class="mb-10">
        <label class="flex flex-col items-center">
          <input
            v-model="name"
            type="text"
            class="mt-0 block w-full px-0.5 text-xl placeholder-gray-200 text-center border-0 border-b-2 bg-transparent border-highlight focus:ring-0 focus:border-white"
            placeholder="Name igä.."
          />
        </label>
      </div>
      <div class="flex justify-between w-full">
        <div>
          <button
            v-if="!jkey"
            class="px-8 py-3 text-2xl text-white tracking-widest bg-accent hover:bg-skylight uppercase"
            @click="onHost"
          >Host</button>
        </div>
        <div class="flex">
          <input
            type="text"
            class="mt-0 block w-full px-0.5 text-darker text-xl text-center border-0 focus:ring-0 focus:border-white"
            readonly
            :value="jkey"
          />
          <button
            class="px-8 py-3 text-2xl text-white tracking-widest bg-highlight hover:bg-contrast uppercase"
            @click="onJoin"
          >Join</button>
        </div>
      </div>
    </div>
  </div>
</template>
