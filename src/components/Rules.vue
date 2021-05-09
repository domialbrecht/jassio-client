
<script setup lang="ts">
import { onMounted } from 'vue'
import { setupScrollAnimations } from '~/helpers'
onMounted(() => {
  setupScrollAnimations()
})
</script>
<template>
  <div class="relative mt-48">
    <div class="container mx-auto mb-40 text-center">
      <h2 class="text-6xl uppercase text-default mb-5">Weisch nid wie? Hie d Regle</h2>
      <p class="text-lg">
        Nachfougend isch der Spiuablouf erklärt. Klick jewils uf d ?-Element
        für e lengeri Texterklärig. Die Regle si natürlech ou für z normale
        Jasse vor Ort awendbar.
      </p>
    </div>
    <div class="rulesSection py-20 px-10">
      <div class="help">?</div>
      <div class="mb-64 flex justify-around items-center">
        <div class="table w-1/3 js-animate-in-trigger" data-anmiate-in-stagger="200">
          <div class="flex justify-between mb-5 px-5">
            <div class="bg-contrast w-12 h-12 rounded-full js-animate-in-item animate-in-fade"></div>
            <div class="bg-dark w-12 h-12 rounded-full js-animate-in-item animate-in-fade"></div>
          </div>
          <div class="bg-white w-full h-96 rounded-2xl"></div>
          <div class="flex justify-between mt-5 px-5">
            <div class="bg-dark w-12 h-12 rounded-full js-animate-in-item animate-in-fade"></div>
            <div class="bg-contrast w-12 h-12 rounded-full js-animate-in-item animate-in-fade"></div>
          </div>
        </div>
        <div class="w-1/3 js-animate-in animate-in-slideX-left">
          <h3 class="uppercase text-5xl mb-3 text-default font-bold">Z Setup</h3>
          <p class="text-xl">
            Zum spile vomene Schieber, so heisst die Jassart wo mir hie spile,
            bruchsch aus ersts mau vier Lüt. Gjasset seuber wird ner i zwöier
            Teams. D Teammitglider sitze übers Chrütz.
          </p>
        </div>
      </div>
      <div class="mb-12 flex justify-around items-center">
        <div class="w-1/3">
          <div class="col-span-2 grid grid-cols-4 gap-3 mb-10">
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use href="/images/svg-cards.svg#heart_1" />
              </svg>
            </div>
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use href="/images/svg-cards.svg#diamond_1" />
              </svg>
            </div>
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use href="/images/svg-cards.svg#spade_1" />
              </svg>
            </div>
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use href="/images/svg-cards.svg#club_1" />
              </svg>
            </div>
          </div>
          <div class="col-span-2 grid grid-cols-9 gap-1">
            <div
              v-for="card in ['6', '7', '8', '9', '10', 'jack', 'queen', 'king', '1']"
              :key="card"
              class="bg-sky"
            >
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use :href="`/images/svg-cards.svg#spade_${card}`" />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-1/3 js-animate-in animate-in-slideX-left">
          <h3 class="uppercase text-5xl mb-3 text-default font-bold">D Jasscharte</h3>
          <p class="text-xl">
            Es Jassdeck besteit us 36 Charte, ufteilt i vier verschideni
            Farbe. D Farbe vo links nach rechts heisse:
            <span
              class="font-bold"
            >Härz, Egge, Schufle, Chrütz</span>. I
            jeder Farb si daher 9 Charte. Agfange bim 6i, 7ni, 8i, 9i
            <span
              class="text-accent"
            >(Näu)</span>
            , zum 10ni ner der
            <span class="font-bold">Buur, d Dame, der Chünig und z Ass</span>
            .
          </p>
        </div>
      </div>
    </div>
    <div class="rulesBetween">
      <div class="betweenLine absolute h-full w-1 bg-light"></div>
      <div class="flex justify-between items-center py-10">
        <div class="flex items-center">
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left:-14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Verteile</h4>
          </div>
        </div>
        <div class="ml-10 flex items-center">
          <div class="cardPlaceholder">36</div>
          <div>
            <h4 class="uppercase text-xl mx-5">Charte mischle > verteile</h4>
          </div>
          <div class="cardPlaceholder">9</div>
        </div>
        <div class="help">?</div>
      </div>
      <div class="flex justify-between items-center py-10">
        <div class="flex items-center">
          <div
            class="bg-highlight relative rounded-full w-8 h-8"
            style="
            left:
            -14px"
          ></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Start bestimme</h4>
          </div>
        </div>
        <div class="ml-10 grid grid-flow-col gap-3" style="max-width:70%;">
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#diamond_10" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use href="/images/svg-cards.svg#back" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
        <div class="help">?</div>
      </div>
    </div>
    <div class="rulesSection rulesSectionDark">
      <div class="help">?</div>
    </div>
    <div class="rulesSection">
      <div class="help">?</div>
    </div>
  </div>
</template>
<style scoped>
.rulesSection {
  min-height: 400px;
  position: relative;
  @apply rounded-3xl;
  @apply bg-light;
  @apply container;
  @apply mx-auto;
}

.rulesSection.rulesSectionDark {
  @apply bg-dark;
}

.rulesBetween {
  @apply relative;
  @apply container;
  @apply mx-auto;
  @apply pl-20;
}

.help {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  @apply bg-sky;
}

.rulesBetween .help {
  position: static;
}

.cardPlaceholder {
  width: 60px;
  height: 86px;
  @apply bg-sky;
  @apply text-xl;
  @apply rounded;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
