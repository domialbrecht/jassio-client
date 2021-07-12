<script lang="ts">
import { ref, defineComponent } from 'vue'
import { WisTypes } from '~/defs'
import IconStoeck from '~/components/helpers/WisStoeckIcon.vue'
export default defineComponent({
  components: { IconStoeck },
  emits: ['selected', 'send'],
  setup(props, { emit }) {
    const selectType = (type: string) => {
      emit('selected', type)
    }
    const submitWis = () => {
      emit('send')
    }
    const types = WisTypes
    return {
      selectType, submitWis, types,
    }
  },
})
</script>
<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-black bg-opacity-40"
  >
    <div class="container mx-auto z-10 text-white">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="type in types" :key="type.name" class="h-60 w-52 flex flex-col items-center p-4">
          <span class="text-2xl uppercase">{{ type.name }}</span>
          <button
            class="flex items-center justify-center rounded-2xl w-full h-5/6 text-dark"
            @click="selectType(type.name)"
          >
            <component :is="type.icon"></component>
          </button>
        </div>
        <div class="h-60 w-52 flex flex-col items-center p-4">
          <span class="text-2xl uppercase">Stoeck</span>
          <button
            class="flex items-center justify-center rounded-2xl w-full h-5/6 text-dark"
            @click="selectType('stoeck')"
          >
            <IconStoeck />
          </button>
        </div>
      </div>
      <div class="mt-2 mb-3 flex justify-center">
        <button
          class="px-8 py-3 text-2xl text-white tracking-widest bg-highlight hover:bg-contrast uppercase rounded-4xl"
          @click="submitWis"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
button:focus {
  outline: 0;
}
</style>
