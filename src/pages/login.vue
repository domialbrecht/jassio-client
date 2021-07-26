<template>
  <Header :show-background="true" />
  <main>
    <div class="flex flex-col justify-center items-center h-full relative mt-20 py-20">
      <h1 class="text-blue-900 text-5xl">
        Login / Registriere
      </h1>
      <div class="px-10 pt-8 pb-8">
        <div v-if="errorMessage" class="mb-3 bg-red-400 rounded-2xl py-2 px-2 flex justify-center text-base leading-6 font-medium text-white">
          <span>{{ errorMessage }}</span>
        </div>
        <div v-if="hasLoading" class="bg-green-400 rounded-2xl py-2 px-2 flex justify-center text-base leading-6 font-medium text-white">
          <span class="mr-2">Loading</span>
          <LoadingSpinner />
        </div>
        <form class="mt-12" @submit.prevent="submit">
          <div class="relative">
            <input
              id="email"
              v-model="username"
              autocomplete="username"
              name="email"
              type="text"
              class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
              placeholder="john@doe.com"
            />
            <label
              for="email"
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all sibling-placeholder-shown:text-base sibling-placeholder-shown:text-gray-400 sibling-placeholder-shown:top-2 sibling-focus:-top-3.5 sibling-focus:text-gray-600 peer-focus:text-sm"
            >Email address</label>
          </div>
          <div class="mt-10 relative">
            <input
              id="password"
              v-model="password"
              autocomplete="current-password"
              type="password"
              name="password"
              class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
              placeholder="Password"
            />
            <label
              for="password"
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Password</label>
          </div>
          <button
            type="submit"
            class="mt-10 px-4 py-2 rounded-4xl bg-blue-900 hover:bg-blue-600 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-700 focus:ring-opacity-80 cursor-pointer"
          >
            Ilogge
          </button>
          <button
            type="button"
            class="mt-2 px-4 py-2 rounded-4xl bg-blue-500 hover:bg-blue-300 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400 focus:ring-opacity-80 cursor-pointer"
            @click="register"
          >
            Registriere
          </button>
        </form>
      </div>
    </div>
  </main>
  <Footer />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { useApi } from '~/api/api'
import { useAuth } from '~/api/auth'
import LoadingSpinner from '~/components/helpers/LoadingSpinner.vue'

const router = useRouter()

const username = ref()
const password = ref()

const {
  loading: loginLoading,
  data: loginData,
  post: loginPost,
  errorMessage: loginErrorMessage,
} = useApi('auth/login')
const {
  loading: registerLoading,
  data: registerData,
  post: registerPost,
  errorMessage: registerErrorMessage,
} = useApi('auth/signup')
const { setUser } = useAuth()

const hasLoading = computed(() => {
  return loginLoading.value || registerLoading.value
})
const errorMessage = computed(() => {
  if (loginErrorMessage.value) return loginErrorMessage.value
  else if (registerErrorMessage.value) return registerErrorMessage.value
  else return null
})

const register = () => {
  registerPost({ email: username.value, password: password.value }).then(() => {
    // TODO: Implement remember me in ui
    setUser(registerData.value, true)
    router.push({ name: 'profile' })
  })
}

const submit = () => {
  loginPost({ email: username.value, password: password.value }).then(() => {
    // TODO: Implement remember me in ui
    setUser(loginData.value, true)
    router.push({ name: 'profile' })
  })
}

</script>
