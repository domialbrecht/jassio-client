<script setup lang="ts">
import IconGithub from '~icons/mdi/github'
import IconPhone from '~icons/mdi/phone'

</script>
<template>
  <div class="relative mt-48">
    <div class="container mx-auto mb-40 text-center">
      <h2 class="text-6xl uppercase text-blue-900 mb-5">Gäng no verwirrt? Hiu hesch Hiuf</h2>
      <div class="mt-24 grid grid-cols-4 gap-10 grid-flow-row">
        <a
          class="flex justify-center items-center px-8 py-3 text-2xl text-white tracking-widest bg-blue-900 hover:bg-blue-700 uppercase"
          href="https://www.swisslos.ch/de/jass/informationen/jass-regeln/jass-grundlagen.html"
          target="_blank"
        >Jassregle</a>
        <a
          class="flex justify-center items-center px-8 py-3 text-2xl text-white tracking-widest bg-blue-900 hover:bg-blue-700 uppercase"
          href="https://www.jassverzeichnis.ch/index.php/blog/81-ueberblick-weisregeln-beim-jassen"
          target="_blank"
        >Wie Wisä</a>
        <a
          class="flex justify-center items-center px-8 py-3 text-2xl flex justify-center text-white tracking-widest bg-blue-900 hover:bg-blue-700 uppercase"
          href="discrod"
          target="_blank"
        >
          <span class="mr-1">Discord</span>
          <IconGithub />
        </a>
        <a
          class="flex justify-center items-center px-8 py-3 text-2xl flex justify-center text-white tracking-widest bg-blue-900 hover:bg-blue-700 uppercase"
          href="discrod"
          target="_blank"
        >
          <span class="mr-1">Stifus Handy</span>
          <IconPhone />
        </a>
      </div>
      <h2 class="mt-30 text-6xl uppercase text-blue-900 mb-5">Ready? Denn los!</h2>
      <div class="flex justify-center">
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
</template>
