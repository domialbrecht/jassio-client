<script setup lang="ts">
import Simple from './Simple.vue'
const pointCards = ['diamond_king', 'spade_queen', 'heart_jack', 'diamond_10', 'spade_8', 'heart_6']
const pointValues = [
  { n: 'Chünig', v: 4 },
  { n: 'Dame', v: 3 },
  { n: 'Bur', v: 2 },
  { n: '10ni', v: 10 },
  { n: '8i', v: 8 },
  { n: '6i', v: 11 }
]
const desc =
  'Undeufe isch genau z Gägäteil vo Obeabe. Antstatt d Ass si d 6i die beste Charte. Es 6i schlat es 7ni, es 7ni es 8i etc. Bim Wise isch si när ou z.B. 4 8i besser aus 4 Dame.'
</script>
<template>
  <Simple :desc="desc" :point-cards="pointCards" :point-values="pointValues" />
</template>
