<script setup lang="ts">
import Simple from './Simple.vue'
const pointCards = [
  'heart_1',
  'diamond_king',
  'spade_queen',
  'heart_jack',
  'diamond_10',
  'spade_8',
  'heart_6'
]
const pointValues = [
  { n: 'Ass(obe gstartet)', v: 11 },
  { n: 'Chünig', v: 4 },
  { n: 'Dame', v: 3 },
  { n: 'Bur', v: 2 },
  { n: '10ni', v: 10 },
  { n: '8i', v: 8 },
  { n: '6i(unde gstartet)', v: 11 }
]
const desc =
  'Slamom isch e Kombination vo Obeabe und Undeufe. Dä Spiler wo usgeit bestimmt wo agfange wird. Obe oder Unde. När spiut me jewils ei Rundi so u wechslet när. Das cha zimli komplex wärdä, und mues guet überleit si. Bim Wise und am Schluss bim Zeue giut das wome ir erste Rundi agfange het.'
</script>
<template>
  <Simple :desc="desc" :point-cards="pointCards" :point-values="pointValues" :special="true" />
</template>
