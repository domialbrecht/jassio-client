<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
// import { fetchGameStats } from '~/api/database'
import Rules from '~/components/Rules.vue'
import Further from '~/components/Further.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import KingCard from '~/components/helpers/KingCard.vue'
import JackCard from '~/components/helpers/JackCard.vue'
import NumberCard from '~/components/helpers/NumberCard.vue'
const cardRotate = ref(10)
const getRotateStyle = (i: number): any => {
  return {
    transform: `translate(0%, ${28 - cardRotate.value * i}%) rotate(-${cardRotate.value * i}deg)`,
  }
}
const cards = computed(() => {
  return [
    {
      component: NumberCard,
      styles: getRotateStyle(0),
    },
    {
      component: JackCard,
      styles: getRotateStyle(1),
    },
    {
      component: KingCard,
      styles: getRotateStyle(2),
    },
  ]
})
/* const gameStats = ref([])
const getGameStats = async () => {
  gameStats.value = await fetchGameStats()
} */
function handleSroll() {
  const rTamount = 10
  const scrollPixelDuration = 200
  const dR = rTamount / scrollPixelDuration
  if (window.scrollY < scrollPixelDuration)
    cardRotate.value = 10 - dR * window.scrollY
  else
    cardRotate.value = 10 - dR * 200
}
onMounted(() => {
  window.addEventListener('scroll', handleSroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleSroll)
})
</script>

<template>
  <Header />
  <main>
    <div class="relative heroContainer gradient-main">
      <div class="pt-12 pb-40 absolute top-0 right-0 left-0 bottom-0 hero">
        <div class="flex flex-col container mx-auto h-full">
          <div class="flex justify-between items-center h-full">
            <div class>
              <div>
                <h1 class="mb-8 text-8xl text-white font-sans font-bold uppercase">
                  Intersim
                  <br />Jass Online.
                </h1>
                <div>
                  <router-link
                    class="px-8 py-3 text-2xl text-white relative tracking-widest bg-highlight uppercase heroButton"
                    to="/game"
                    title="game"
                  >
                    <span class="heroButtonOverlay"></span>
                    <span class="label relative z-10">Spiu starte</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="relative z-10 h-full cardWrapper">
              <div v-for="(card, i) in cards" :key="i" class="z-10 card" :style="card.styles">
                <div class="playing-card-container">
                  <div class="playing-card">
                    <component :is="card.component"></component>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="uppercase text-white text-2xl">
            <span class="desc">22 Spiu gspiut</span>
            <span class="desc">64 Bure Gwise</span>
            <span class="desc">Mark 10 Streak</span>
          </div>
        </div>
      </div>
      <div>
        <svg
          id="Layer_1"
          data-name="Layer 1"
          class="absolute w-full -bottom-1px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1365 86.26"
        >
          <path
            d="M1365,0V86.26H0V0C110.94,47.12,374.73,80.26,682.5,80.26S1254.06,47.12,1365,0Z"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
    <Rules />
    <Further />
  </main>
  <Footer />
</template>

<style scoped>
.heroContainer {
  height: 94vh;
  min-height: 860px;
  max-height: 926px;
  background-color: #2b2e4a;
}

.cardWrapper {
  width: 450px;
  display: flex;
  align-items: center;
}

@media (max-width: 1800px) {
  .cardWrapper {
    width: 350px;
  }
}

.card {
  width: 100%;
  position: absolute;
  transition: transform 0.5s;
}

.desc {
  margin-right: 20px;
}

.desc:not(:last-child)::after {
  padding-left: 20px;
  content: "|";
}
</style>
