<script lang="ts">
import { ref, defineComponent } from 'vue'
import PlayerCard from '~/components/helpers/PlayerCard.vue'
import { PlayerPlaceholder } from '~/defs'
export default defineComponent({
  components: { PlayerCard },
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
    return { name, onHost, onJoin, PlayerPlaceholder }
  },
})

</script>
<template>
  <div class="flex items-center justify-center flex-col py-16 h-full">
    <div class="mb-6 max-w-3xl p-10 2xl:p-20 flex justify-center items-center flex-col">
      <div class="max-w-80">
        <PlayerCard :name="name" :show-name="false" :assigned="false" />
      </div>
      <div class="mb-10 mt-5">
        <label class="flex flex-col items-center">
          <input
            v-model="name"
            type="text"
            class="mt-0 block w-full px-0.5 text-5xl placeholder-gray-400 text-center border-0 border-b-2 bg-transparent border-highlight focus:outline-none focus-visible:outline-none focus:border-skylight"
            placeholder="Name igä.."
          />
        </label>
      </div>
    </div>
    <div class="flex items-center flex-col w-1/2">
      <div class="flex justify-between w-full">
        <div>
          <button
            v-if="!jkey"
            class="px-8 py-3 text-2xl text-white tracking-widest bg-highlight hover:bg-contrast uppercase rounded-4xl focus:outline-none"
            @click="onHost"
          >Host</button>
        </div>
        <div class="flex">
          <input
            type="text"
            class="mt-0 mr-4 block w-full px-0.5 text-darker text-xl text-center border-0 rounded-4xl focus:ring-0 focus:border-white"
            readonly
            :value="jkey"
          />
          <button
            class="px-8 py-3 text-2xl text-white tracking-widest bg-highlight hover:bg-contrast uppercase rounded-4xl focus:outline-none"
            @click="onJoin"
          >Join</button>
        </div>
      </div>
    </div>
  </div>
</template>
