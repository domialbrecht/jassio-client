<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Team } from '~/types'
const props = defineProps({
  hostPlace: {
    type: Number,
    required: false
  },
  team: {
    type: Number,
    required: false
  }
})
const teamAWin = computed(() => {
  return props.team === Team.TeamA
})
const playerWon = computed(() => {
  if (teamAWin.value) return props.hostPlace === 0
  else return props.hostPlace === 1
})
const router = useRouter()
const exit = () => {
  router.push('/')
}
</script>
<template>
  <div class="absolute inset-0 bg-black bg-opacity-40">
    <div
      class="absolute inset-0 flex justify-between items-center overflow-hidden"
      :class="playerWon ? 'win' : 'lost'"
    >
      <div v-for="n in 13" :key="n" class="confetti">
        {{ !playerWon ? '😓' : '' }}
      </div>
    </div>
    <div class="absolute inset-0 flex items-center flex justify-center flex-col text-white">
      <div class="flex flex-col justify-center items-center">
        <span class="text-8xl">{{ playerWon ? 'Sieg!!' : 'Verlore :(' }}</span>
        <span class="mt-4 text-4xl">{{ `Gratuliere Team ${teamAWin ? 'Blau' : 'Rot'}` }}</span>
      </div>
      <div class="flex flex-col justify-center items-center">
        <span>WIP Spiuinformatione</span>
      </div>
      <div class="mt-4 flex flex-col justify-center items-center">
        <button
          class="px-8 py-3 text-2xl text-white tracking-widest bg-highlight hover:bg-contrast uppercase rounded-4xl focus:outline-none"
          @click="exit"
        >
          Beändä
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confetti {
  position: absolute;
  width: 10px;
  height: 30px;
  background: #ffd300;
  top: 0;
  opacity: 0;
}

.confetti:nth-child(1) {
  left: 7%;
  transform: rotate(-40deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 182ms;
  animation-duration: 1116ms;
}
.confetti:nth-child(2) {
  left: 14%;
  transform: rotate(4deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 161ms;
  animation-duration: 1076ms;
}
.confetti:nth-child(3) {
  left: 21%;
  transform: rotate(-51deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 481ms;
  animation-duration: 1103ms;
}
.confetti:nth-child(4) {
  left: 28%;
  transform: rotate(61deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 334ms;
  animation-duration: 708ms;
}
.confetti:nth-child(5) {
  left: 35%;
  transform: rotate(-52deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 302ms;
  animation-duration: 776ms;
}
.confetti:nth-child(6) {
  left: 42%;
  transform: rotate(38deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 180ms;
  animation-duration: 1168ms;
}
.confetti:nth-child(7) {
  left: 49%;
  transform: rotate(11deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 395ms;
  animation-duration: 1200ms;
}
.confetti:nth-child(8) {
  left: 56%;
  transform: rotate(49deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 14ms;
  animation-duration: 887ms;
}
.confetti:nth-child(9) {
  left: 63%;
  transform: rotate(-72deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 149ms;
  animation-duration: 805ms;
}
.confetti:nth-child(10) {
  left: 70%;
  transform: rotate(10deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 351ms;
  animation-duration: 1059ms;
}
.confetti:nth-child(11) {
  left: 77%;
  transform: rotate(4deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 307ms;
  animation-duration: 1132ms;
}
.confetti:nth-child(12) {
  left: 84%;
  transform: rotate(42deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 464ms;
  animation-duration: 776ms;
}
.confetti:nth-child(13) {
  left: 91%;
  transform: rotate(-72deg);
  animation: makeItRain 1000ms infinite ease-out;
  animation-delay: 429ms;
  animation-duration: 818ms;
}
.confetti:nth-child(even) {
  z-index: 1;
}
.confetti:nth-child(4n) {
  width: 5px;
  height: 12px;
  animation-duration: 2000ms;
}
.confetti:nth-child(3n) {
  width: 3px;
  height: 10px;
  animation-duration: 2500ms;
  animation-delay: 1000ms;
}
.confetti:nth-child(odd) {
  background: #7431e8;
}
.confetti:nth-child(4n-7) {
  background: red;
}

.lost .confetti {
  background: 0;
}

@keyframes makeItRain {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    transform: translateY(350px);
  }
}
</style>
