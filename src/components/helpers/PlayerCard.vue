<script lang="ts">
import { defineComponent, computed } from 'vue'
import { createAvatar } from '@dicebear/avatars'
import * as avatarStyle from '@dicebear/avatars-bottts-sprites'

export default defineComponent({
  props: {
    name: { type: String, required: true },
    showName: { type: Boolean, required: false, default: true },
    inBoard: { type: Boolean, default: false },
    tiny: { type: Boolean, default: false },
    assigned: { type: Boolean, default: true },
    highlight: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const displayClasses = computed(() => {
      return {
        'text-white': props.inBoard && !props.highlight,
        'text-highlight': props.highlight,
        'text-3xl': props.inBoard && !props.tiny,
        'text-2xl': !props.inBoard && !props.tiny,
        'text-lg': props.tiny,
      }
    })
    /* const getPlayerColor = (place: number) => {
      if (!props.assigned) return 'grey'
      return place % 2 ? 'purple' : 'blue'
    } */
    const svg = computed(() => {
      return createAvatar(avatarStyle, {
        seed: props.name,
        colors: ['lightBlue'],
        colorful: true,
      })
    })
    return { svg, displayClasses }
  },
})

</script>
<template>
  <div v-if="!tiny" class="avatarWrapper rounded-full p-2" :class="!inBoard ? 'bg-gray-300 mb-2 w-full' : 'boardavatar'" v-html="svg">
  </div>
  <div v-if="showName" class="uppercase" :class="displayClasses">
    {{ name }}
  </div>
</template>

<style>
.avatarWrapper svg {
  width: 100%;
  height: auto;
}
.boardavatar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.boardavatar svg {
  width: 80%;
}
</style>
