<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
import Rules from '~/components/Rules.vue'
import Further from '~/components/Further.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
const cardRotate = ref(10)
const getRotateStyle = (i: number): any => {
  return {
    transform: `translate(0%, ${28 - cardRotate.value * i}%) rotate(-${cardRotate.value * i}deg)`,
  }
}
const cards = computed(() => {
  return [
    {
      name: 'club_10',
      styles: getRotateStyle(0),
    },
    {
      name: 'diamond_jack',
      styles: getRotateStyle(1),
    },
    {
      name: 'heart_king',
      styles: getRotateStyle(2),
    },
  ]
})
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
    <div class="relative heroContainer">
      <div class="pt-12 pb-40 absolute top-0 right-0 left-0 bottom-0 hero">
        <div class="flex flex-col container mx-auto h-full">
          <div class="flex justify-between items-center h-full">
            <div class>
              <div>
                <h1 class="mb-8 text-8xl text-white font-sans font-bold uppercase">
                  Intersim Jass
                  <br />Online.
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
              <div v-for="card in cards" :key="card.name" class="z-10 card" :style="card.styles">
                <div class="playing-card-container">
                  <div class="playing-card">
                    <svg class="w-full h-full" viewBox="0 0 169 245">
                      <use :href="`/images/svg-cards.svg#${card.name}`" />
                    </svg>
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
          class="absolute w-full bottom-0"
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

<style>
.heroButton .heroButtonOverlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #51c4d3;
  opacity: 0.8;
  transform: scaleX(0);
  transform-origin: 100% 100%;
  transition: transform 0.4s cubic-bezier(0.53, 0.21, 0, 1);
  will-change: transform;
}

.heroButton:hover .heroButtonOverlay {
  transform-origin: 0 0;
  transform: scaleX(1);
}
</style>
<style scoped>
.heroContainer {
  height: 94vh;
  min-height: 860px;
  max-height: 926px;
  background-color: #2b2e4a;
  background-image: linear-gradient(0deg, #2b2e4a 1%, #06132f 99%);
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
