<script lang="ts">
import { defineComponent, PropType } from 'vue'
type PointValue = {
  n: string
  v: number
}
export default defineComponent({
  props: {
    desc: { type: String, required: true },
    pointCards: { type: Array as PropType<string[]>, required: true },
    pointValues: { type: Array as PropType<PointValue[]>, required: true },
    special: { type: Boolean, default: false },
  },
})
</script>
<template>
  <div class="mt-10 flex items-center">
    <div class="table w-1/3 js-animate-in animate-in-slideX-left">
      <div class="flex justify-between mb-5 px-5">
        <div class="bg-contrast w-12 h-12 rounded-full"></div>
        <div class="bg-dark w-12 h-12 rounded-full"></div>
      </div>
      <div class="bg-white w-full h-96 rounded-2xl"></div>
      <div class="flex justify-between mt-5 px-5">
        <div class="bg-dark w-12 h-12 rounded-full"></div>
        <div class="bg-contrast w-12 h-12 rounded-full"></div>
      </div>
    </div>
    <div class="w-2/3 ml-20 js-animate-in animate-in-slideX-left">
      <h3 class="uppercase text-5xl mb-3 text-white font-bold">Rundeablouf</h3>
      <p class="text-xl text-white">{{ desc }}</p>
    </div>
  </div>
  <div class="mt-28 flex items-center">
    <div class="w-1/3 js-animate-in animate-in-fade">
      <div class="grid grid-rows-2 gap-3 mb-10" :class="!special ? 'grid-cols-3' : 'grid-cols-4'">
        <div v-for="card in pointCards" :key="card" class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#' + card" />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-2/3 ml-20 js-animate-in animate-in-slideX-left">
      <h3 class="uppercase text-5xl mb-3 text-white font-bold">Punktecharte</h3>
      <div class="text-xl text-white">
        <ul>
          <li v-for="pv in pointValues" :key="pv.v" class="flex mb-2">
            <span class="text-3xl mr-3">{{ pv.n }}</span>
            <span
              class="bg-white text-dark rounded-full flex justify-center items-center w-9 h-9"
            >{{ pv.v }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
