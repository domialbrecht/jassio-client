<script lang="ts">
import { defineComponent } from 'vue'
import SchiebeIcon from '../helpers/SchiebeIcon.vue'
import { RuleTypes } from '~/defs'
export default defineComponent({
  components: { SchiebeIcon },
  props: {
    hideswitch: { type: Boolean, default: false },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const selectType = (type: string) => {
      emit('selected', type)
    }
    const types = RuleTypes
    return {
      selectType, types,
    }
  },
})
</script>
<template>
  <div class="absolute top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40">
    <div class="container mx-auto grid grid-cols-5 gap-4 z-10 text-white">
      <div
        v-for="type in types"
        :key="type.name"
        class="h-60 w-52 flex flex-col items-center p-4"
        :class="type.color"
      >
        <span class="text-2xl">{{ type.name }}</span>
        <button
          v-if="!(type.name === 'Trumpf') && !(type.name === 'Slalom')"
          class="flex items-center justify-center rounded-2xl w-full h-5/6 text-white text-8xl"
          @click="selectType(type.name)"
        >
          <component :is="type.icon"></component>
        </button>
        <div
          v-if="type.name === 'Slalom'"
          class="grid grid-cols-2 grid-rows-2 flex-grow gap-2 w-full px-4 text-dark"
        >
          <button
            class="flex items-center justify-center rounded-2xl bg-gray-100"
            @click="selectType(`${type.name}_up`)"
          >
            Obe
          </button>
          <button
            class="flex items-center justify-center rounded-2xl bg-gray-100"
            @click="selectType(`${type.name}_down`)"
          >
            Unde
          </button>
        </div>
        <div
          v-if="type.name === 'Trumpf'"
          class="grid grid-cols-2 grid-rows-2 flex-grow gap-2 w-full px-4 text-dark"
        >
          <button
            class="flex items-center justify-center rounded-2xl bg-gray-100"
            @click="selectType(`${type.name}_heart`)"
          >
            Härz
          </button>
          <button
            class="flex items-center justify-center rounded-2xl bg-gray-100"
            @click="selectType(`${type.name}_diamond`)"
          >
            Egge
          </button>
          <button
            class="flex items-center justify-center rounded-2xl bg-gray-100"
            @click="selectType(`${type.name}_spade`)"
          >
            Schufle
          </button>
          <button
            class="flex items-center justify-center rounded-2xl bg-gray-100"
            @click="selectType(`${type.name}_club`)"
          >
            Chrütz
          </button>
        </div>
      </div>
      <div v-if="!hideswitch" class="h-60 w-52 flex flex-col items-center p-4 bg-orange-400">
        <span class="text-2xl">Schiebe</span>
        <button
          class="flex items-center justify-center rounded-2xl w-full h-5/6 text-dar"
          @click="selectType('switch')"
        >
          <SchiebeIcon />
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
