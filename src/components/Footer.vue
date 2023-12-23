<script setup lang="ts"></script>

<template>
  <footer class="mt-52">
    <div class="relative">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        class="absolute w-full bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1365 86.26"
      >
        <path
          d="M1365,0V86.26H0V0C110.94,47.12,374.73,80.26,682.5,80.26S1254.06,47.12,1365,0Z"
          fill="#1E3A8A"
        />
      </svg>
    </div>
    <div class="bg-blue-900 h-40">
      <div class="w-full h-full flex items-center text-white">
        <div class="container mx-auto">
          <router-link to="/about" class="block uppercase mb-3 hover:text-highlight"
            >Über z Projekt</router-link
          >
          <span>© 2021 Dominik Albrecht</span>
        </div>
      </div>
    </div>
  </footer>
</template>
