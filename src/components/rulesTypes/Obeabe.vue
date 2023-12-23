<script setup lang="ts">
import Simple from './Simple.vue'
const pointCards = ['heart_1', 'diamond_king', 'spade_queen', 'heart_jack', 'diamond_10', 'spade_8']
const pointValues = [
  { n: 'Ass', v: 11 },
  { n: 'Chünig', v: 4 },
  { n: 'Dame', v: 3 },
  { n: 'Bur', v: 2 },
  { n: '10ni', v: 10 },
  { n: '8i', v: 8 }
]
const desc =
  'Obeabe Jasse isch sehr easy, und vilicht das wode am beste kennsch. Ass schlat Künig, Künig schlat Dame, Dame schlat Bur und so witer. Bim Wisä isch das Blatt und die Kombination die Besti wo am höchstä isch. Vier Chünigä si besser aus vier 10ni.'
</script>
<template>
  <Simple :desc="desc" :point-cards="pointCards" :point-values="pointValues" />
</template>
