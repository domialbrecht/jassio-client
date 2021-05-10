<template>
  <div class="mt-10 flex items-center">
    <div class="table w-1/3 js-animate-in animate-in-slideX-left">
      <div class="flex justify-between mb-5 px-5">
        <div class="bg-contrast w-12 h-12 rounded-full"></div>
        <div class="bg-dark w-12 h-12 rounded-full"></div>
      </div>
      <div class="bg-white w-full h-96 rounded-2xl"></div>
      <div class="flex justify-between mt-5 px-5">
        <div class="bg-dark w-12 h-12 rounded-full"></div>
        <div class="bg-contrast w-12 h-12 rounded-full"></div>
      </div>
    </div>
    <div class="w-2/3 ml-20 js-animate-in animate-in-slideX-left">
      <h3 class="uppercase text-5xl mb-3 text-white font-bold">
        Rundeablouf
      </h3>
      <p class="text-xl text-white">
        Obeabe Jasse isch sehr easy, und vilicht das wode am beste kennsch. Ass schlat Künig, Künig schlat Dame, Dame schlat Bur und so witer. Bim Wisä isch das Blatt und die Kombination die besti wo am höchstä isch. 4 Chünigä si besser aus 4 10ni.
      </p>
    </div>
  </div>
  <div class="mt-28 flex items-center">
    <div class="w-1/3 js-animate-in animate-in-fade">
      <div class="grid grid-cols-3 grid-rows-2 gap-3 mb-10">
        <div class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#heart_1'" />
          </svg>
        </div>
        <div class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#diamond_king'" />
          </svg>
        </div>
        <div class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#spade_queen'" />
          </svg>
        </div>
        <div class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#heart_jack'" />
          </svg>
        </div>
        <div class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#diamond_10'" />
          </svg>
        </div>
        <div class="h-44">
          <svg class="h-full" viewBox="0 0 169 245">
            <use :href="'/images/svg-cards.svg#spade_8'" />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-2/3 ml-20 js-animate-in animate-in-slideX-left">
      <h3 class="uppercase text-5xl mb-3 text-white font-bold">
        Punktecharte
      </h3>
      <p class="text-xl text-white">
        <ul>
          <li>Ass: 11 Pünkt</li>
          <li>Chünig: 4 Pünkt</li>
          <li>Dame: 3 Pünkt</li>
          <li>Bur: 2 Pünkt</li>
          <li>10: 10 Pünkt</li>
          <li>8: 8 Pünkt</li>
        </ul>
      </p>
    </div>
  </div>
</template>
