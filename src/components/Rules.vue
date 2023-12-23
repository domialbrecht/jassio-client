<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { setupScrollAnimations } from '~/helpers'
import { RuleTypes } from '~/defs'

onMounted(() => {
  setupScrollAnimations()
})
const activeType = ref('Obeabe')
const types = RuleTypes
</script>
<template>
  <div class="relative mt-48">
    <div class="container mx-auto mb-40 text-center">
      <h2 class="text-6xl uppercase text-blue-900 mb-5">Weisch nid wie? Hie d Regle</h2>
      <p class="text-lg">
        Nachfougend isch der Spiuablouf erklärt. Klick jewils uf d ?-Element für Tipps und
        Spiubispiu. Die Regle si natürlech ou für z normale Jasse vor Ort awendbar.
      </p>
    </div>
    <div class="rulesSection py-20 px-10">
      <div class="help">?</div>
      <div class="mb-64 flex justify-around items-center">
        <div class="table w-1/3 js-animate-in-trigger" data-anmiate-in-stagger="200">
          <div class="flex justify-between mb-5 px-5">
            <div
              class="bg-contrast w-12 h-12 rounded-full js-animate-in-item animate-in-fade"
            ></div>
            <div class="bg-dark w-12 h-12 rounded-full js-animate-in-item animate-in-fade"></div>
          </div>
          <div class="bg-white w-full h-96 rounded-2xl"></div>
          <div class="flex justify-between mt-5 px-5">
            <div class="bg-dark w-12 h-12 rounded-full js-animate-in-item animate-in-fade"></div>
            <div
              class="bg-contrast w-12 h-12 rounded-full js-animate-in-item animate-in-fade"
            ></div>
          </div>
        </div>
        <div class="w-1/3 js-animate-in animate-in-slideX-left">
          <h3 class="uppercase text-5xl mb-3 text-blue-900 font-bold">Z Setup</h3>
          <p class="text-xl">
            Zum spile vomene Schieber, so heisst die Jassart wo mir hie spile, bruchsch aus ersts
            mau vier Lüt. Gjasset seuber wird ner i zwöier Teams. D Teammitglider sitze übers
            Chrütz. Z Ziel vom Schieber isch vorem andere Team 100 Pünkt z erreiche.
          </p>
        </div>
      </div>
      <div class="mb-12 flex justify-around items-center">
        <div class="w-1/3">
          <div class="col-span-2 grid grid-cols-4 gap-3 mb-10">
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use :href="'/images/svg-cards.svg#heart_1'" />
              </svg>
            </div>
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use :href="'/images/svg-cards.svg#diamond_1'" />
              </svg>
            </div>
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use :href="'/images/svg-cards.svg#spade_1'" />
              </svg>
            </div>
            <div class="bg-sky">
              <svg class="w-full h-full" viewBox="0 0 169 245">
                <use :href="'/images/svg-cards.svg#club_1'" />
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
          <h3 class="uppercase text-5xl mb-3 text-blue-900 font-bold">D Jasscharte</h3>
          <p class="text-xl">
            Es Jassdeck besteit us 36 Charte, ufteilt i vier verschideni Farbe. D Farbe vo links
            nach rechts heisse:
            <span class="font-bold">Härz, Egge, Schufle, Chrütz</span>. I jeder Farb si daher 9
            Charte. Agfange bim 6i, 7ni, 8i, 9i
            <span class="text-accent">(Näu)</span>
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
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left: -14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Spiustart</h4>
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
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left: -14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Start bestimme</h4>
          </div>
        </div>
        <div class="ml-10 grid grid-flow-col gap-3" style="max-width: 70%">
          <div v-for="n in 4" :key="n">
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#back'" fill="#1E3A8A" />
            </svg>
          </div>
          <div class>
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#diamond_10'" fill="#1E3A8A" />
            </svg>
          </div>
          <div v-for="n in 4" :key="n">
            <svg class="w-full h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#back'" fill="#1E3A8A" />
            </svg>
          </div>
        </div>
        <div class="help">?</div>
      </div>
    </div>
    <div class="rulesSection rulesSectionDark p-20">
      <div class="help">?</div>
      <div class="js-animate-in animate-in-slideX-left">
        <h3 class="uppercase text-5xl mb-3 text-white font-bold">1/3 Jassart wählä</h3>
        <div class="flex justify-between items-center">
          <p class="text-xl text-white">
            Nachem verteile muäs dä Spiler vo "Vorhand" het d Jassart bestimme. Ir erste Rundi isch
            das wie obe zeigt dä wo z Egge 10ni het. Ner geiz eifach am Chlapf nah. Der Spiler wählt
            vode unde ufgfüärtä Arte eini us, oder faus är z Gfüäu het si Mitspiler sig besser,
            chaner "schiebe". Wird gschobe bestimmt i dere Rundi der Mitspiler d Jassart(Vorhand het
            immer no der ander). Nach der Wahl mues der Spiler mit Vorhand die ersti Charte spile.
            Nachfolgend si d Jassarte ufglistet.
          </p>
        </div>
      </div>
      <div
        class="grid grid-flow-col gap-5 mt-12 js-animate-in-trigger"
        data-anmiate-in-stagger="200"
      >
        <div
          v-for="type in types"
          :key="type.name"
          class="flex flex-col items-center js-animate-in-item animate-in-fade"
        >
          <div
            class="w-full h-70 p-6 flex items-center justify-center text-white text-8xl"
            :class="type.color"
          >
            <component :is="type.icon"></component>
          </div>
          <span class="uppercase text-white text-2xl mt-5">{{ type.name }}</span>
        </div>
      </div>
    </div>
    <div class="rulesBetween">
      <div class="betweenLine absolute h-full w-1 bg-light"></div>
      <div class="flex justify-between items-center py-10">
        <div class="flex items-center">
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left: -14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Lege vor erste Charte(pro Spiler)</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="rulesSection p-20">
      <div class="help">?</div>
      <div class="js-animate-in animate-in-slideX-left">
        <h3 class="uppercase text-5xl mb-3 text-blue-900 font-bold">2/3 Wisä</h3>
        <div class="flex justify-between items-center">
          <p class="text-xl text-blue-900">
            Jede Spiler cha zum Zitpunkt vo sire erste Charte pro Rundi "Wisä". Vo Wisä redt me we e
            Spiler e gwüssi Kombination a Charte het. Je nachdäm was für ne Wis me het bechunt z
            Team ner Pünkt. Pro Rundi cha nur eis Team Pünkt für ä Wis ufschribe, und zwar immer das
            mite der Kombination mitem meiste Wärt.
            <br />
            <br />Generell mues e Wis mit der erste Charte agäh wärdä(we der Spiler wot Wisä, mä
            mues nid). Die einzigi Usnahm si d "Stöck". Die cha der Spiler agäh wener die zwöiti
            Charte vor Kombi usspiut. Vergisst mä ä Wis isch Päch gsi. Het ei Spiler mehreri Wisä de
            seiter nur der höchst. Nachdem me het festgsteut weles Team der höchst Wis het, cha das
            Team sämtlächi Wise deklariere und verbuechä(ou di wo zerst nid si gseit worde).
          </p>
        </div>
      </div>
      <div class="flex mt-12 justify-center js-animate-in animate-in-fade">
        <div class="mr-11">
          <span class="bold text-2xl">3-Blatt (20)</span>
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#heart_8'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#heart_9'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#heart_10'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
        <div class="mr-11">
          <span title="Dame u Künig vom aktuelle Trumpf" class="bold text-2xl text-cyan-600 block"
            >Stöck (20)</span
          >
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#diamond_queen'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#diamond_king'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
        <div class="mr-11">
          <span class="bold text-2xl">Vier-Blatt (50)</span>
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_8'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_9'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_10'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_jack'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex mt-12 justify-center js-animate-in animate-in-fade">
        <div class="mr-11">
          <span class="bold text-2xl">5-Blatt (100)...6 (150) etc.</span>
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_9'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_10'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_jack'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_queen'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_king'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
        <div>
          <span class="bold text-2xl">Aui vo eim (100)</span>
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_8'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#heart_8'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#diamond_8'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_8'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex mt-12 justify-center js-animate-in animate-in-fade">
        <div class="mr-11">
          <span class="bold text-2xl">Aui 9i (150)</span>
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#diamond_9'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#heart_9'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_9'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_9'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
        <div>
          <span class="bold text-2xl">Aui Bure (200)</span>
          <div class="flex py-5 h-56">
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#diamond_jack'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#heart_jack'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#club_jack'" fill="#2B2E4A" />
            </svg>
            <svg class="h-full" viewBox="0 0 169 245">
              <use :href="'/images/svg-cards.svg#spade_jack'" fill="#2B2E4A" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="rulesBetween">
      <div class="betweenLine absolute h-full w-1 bg-light"></div>
      <div class="flex justify-between items-center py-10">
        <div class="flex items-center">
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left: -14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Spiurundi</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="rulesSection p-20">
      <div class="help">?</div>
      <div class="typesswitch flex">
        <div
          v-for="type in types"
          :key="type.name"
          class="w-4 h-4 mr-2 cursor-pointer"
          :class="type.color"
          @click="activeType = type.name"
        ></div>
      </div>
      <div class="js-animate-in animate-in-slideX-left">
        <h3 class="uppercase text-5xl mb-3 text-blue-900 font-bold">3/3 Usspilä</h3>
        <div>
          <p class="text-xl text-blue-900">
            Nachem Wisä, oder we niemer öppis z Wisä het, faht die eigentlechi Rundi a. Der Spiler
            wo Vorhand het spiut die ersti Charte us. När der nächst Spiler am Chlapf nah.
            <span class="text-purple-500"
              >We der Spiler e Charte vor usgspiute Farb(Härz, Egge, Schufle, Chrütz) het de mues är
              eini vor gliche Farb legä! Faus nid chaner irgend e anderi spilä. Usnahm isch wenn d
              Jassart Trumpf isch. Die einzelne Jassarte unde gneuer erklärt.</span
            >
            <span class="ml-1 text-cyan-600">Obe rächts chasch wächslä.</span>
            <br />
            <br />Nachem erste Stich spiut dä Spiler us wo der Stich gmacht het. Das geit när so
            witer bis aui 9 Charte gspiut si worde. Denn wärdä d Pünkt Zeut. Pro Rundi chöi immer
            156 Pünkt gmacht wärdä.
            <span class="text-purple-500"
              >D Jassart bestimmt wie viu Pünkt die einzelne Charte Wärt si. Die Chart wu Pünkt gäbä
              si unde pro Jassart glistet.</span
            >
            100 Bonuspünkt giz wenn eis Team aui Stiche macht, das nennt me e "Match". Gwunne het
            wär zerst 1000 Pünkt erreicht. Wirds knapp so giut die Reihefolg: "Stöck" > "Wis" >
            "Stich". Wenn auso zum Bispiu bi 990 zu 980 z zwöitä Team cha Wisä isch z Spiu direkt
            fertig.
          </p>
        </div>
      </div>
    </div>
    <div class="rulesSection rulesInset">
      <transition-group name="ruletype">
        <div
          v-for="type in types"
          v-show="type.name === activeType"
          :key="type.name"
          class="p-10 insetContainer"
          :class="type.color"
        >
          <div class="help">?</div>
          <div class>
            <h3 class="uppercase text-5xl mb-3 text-white font-bold">{{ type.name }}</h3>
            <div>
              <component :is="type.component"></component>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="rulesBetween">
      <div class="betweenLine absolute h-full w-1 bg-light"></div>
      <div class="flex justify-between items-center py-10">
        <div class="flex items-center">
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left: -14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">1000 Pünkt erreicht</h4>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center pt-10">
        <div class="flex items-center">
          <div class="bg-highlight relative rounded-full w-8 h-8" style="left: -14px"></div>
          <div class="ml-5">
            <h4 class="uppercase text-xl">Team gwinnt!!</h4>
          </div>
        </div>
      </div>
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
  @apply bg-blue-900;
}

.rulesSection.rulesInset {
  z-index: -1;
  background: white;
  padding: 0 50px;
}

.insetContainer {
  position: relative;
  border-radius: 0 0 24px 24px;
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

.typesswitch {
  position: absolute;
  top: 30px;
  right: 100px;
}

.rulesBetween .help {
  position: static;
  margin-right: 20px;
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
.ruletype-enter-active {
  transition: transform 1s ease-out;
}
.ruletype-enter-from,
.ruletype-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
