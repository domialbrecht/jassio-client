<script lang="ts">
import { defineComponent, PropType } from 'vue'
import PlayerCard from './PlayerCard.vue'
import { IPlayer, IHostSetting } from '~/types'
export default defineComponent({
  components: {
    PlayerCard,
  },
  props: {
    jkey: { type: String, default: '' },
    isHost: { type: Boolean, default: false },
    players: { type: Array as PropType<Array<IPlayer>>, required: true },
    hostSettings: { type: Object as PropType<IHostSetting>, required: true },
  },
  setup(props, { emit }) {
    const copyKey = () => {
      navigator.clipboard.writeText(props.jkey)
    }
    return {
      copyKey,
    }
  },
})

</script>
<template>
  <div class="w-3/4 mx-auto py-16 h-full flex flex-col justify-between items-center">
    <div class>
      <div>Settings 1</div>
      <div>Settings 1</div>
      <div>Settings 1</div>
      <div>Settings 1</div>
    </div>
    <div class="grid grid-cols-4 gap-12">
      <PlayerCard v-for="p in players" :key="p.id" :player="p" />
      <div v-for="n in 4 - players.length" :key="n" class="flex flex-col items-center">
        <div class="mb-5 flex-grow bg-white w-full rounded-full"></div>
        <div>Läär</div>
      </div>
    </div>
    <div v-if="isHost" class="flex justify-between w-full items-center">
      <div>
        <button
          class="px-8 py-3 text-2xl text-white tracking-widest bg-accent hover:bg-skylight uppercase"
          @click="copyKey"
        >Iladig kopiere</button>
      </div>
      <a
        class="pointer heroButton px-8 py-3 text-2xl text-white relative tracking-widest bg-highlight uppercase"
      >
        <span class="heroButtonOverlay"></span>
        <span class="label relative z-10">Starte</span>
      </a>
    </div>
  </div>
</template>
