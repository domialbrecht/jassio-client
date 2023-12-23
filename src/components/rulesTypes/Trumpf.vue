<script setup lang="ts">
import Simple from './Simple.vue'
const pointCards = ['heart_jack', 'spade_9', 'heart_1', 'diamond_king', 'spade_queen', 'diamond_10']
const pointValues = [
  { n: 'Trumpf-Bur', v: 20 },
  { n: 'Näu', v: 14 },
  { n: 'Ass', v: 11 },
  { n: 'Chünig', v: 4 },
  { n: 'Dame', v: 3 },
  { n: 'Anderi Bure', v: 2 },
  { n: '10ni', v: 10 }
]
const desc =
  'Trumpf isch wahrschinlech die meist gjasseti Spiuart. Der Spiler wo agit cha eine vo de vier Chartetype uswähle und aus Trumpf deklariere. Nachdäm giutet die gliche Reihefolg wie Obeabe für weli Charte die besti isch, usser das jedi Charte vom Trumpf-Typ besser aus aui nid Trumpf Chartene isch. Innerhalb vom Trumpf seuber giut widerum d Obe-Abe Regle, mit der Usnahm das die höchsti Charte der Bur und die zwöithöchsti z 9i(gnennt Näu innerhalb vom Trumpf) isch.<br><br>Trumpf het paar Usnameregle. Die ersti isch, dass e Spiler nid darf "ungertrumpfe" faus är e anderi Müglechkeit het. Ungertrumpfe heisst uf e gspiuti Trumpf Charte e chlineri lege.<br><br>Die zwöit Usnameregle isch, dass der Trumpf-Bur nid mues agäh wärdä. Het auso e Spiler z.B. nur der Bur allei, und der Spiler vor ihm git e Trumpf(was normalerwis ja nä Charte vom gliche Typ würdi verlange) cha der Spiler mitem Bur e anderi gä.'
</script>
<template>
  <Simple :desc="desc" :point-cards="pointCards" :point-values="pointValues" />
</template>
