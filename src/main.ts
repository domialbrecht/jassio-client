import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import NProgress from 'nprogress'
import App from './App.vue'
import './styles/main.css'
import Index from './pages/index.vue'
import Game from './pages/game.vue'
import About from './pages/about.vue'
import Login from './pages/login.vue'
import Profile from './pages/profile.vue'

import { useAuth } from './api/auth'

const routes = [
  { path: '/', name: 'home', component: Index, meta: { authRoute: false } },
  { path: '/game', name: 'game', component: Game, meta: { authRoute: false } },
  { path: '/about', name: 'about', component: About, meta: { authRoute: false } },
  { path: '/login', name: 'login', component: Login, meta: { authRoute: true } },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { authRoute: true }
  }
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
  NProgress.start()
  const { authenticating, user } = useAuth()
  // Not logged into a guarded route?
  if (authenticating.value === false && to.meta.authRoute === true && !user?.value) {
    if (to.name !== 'login') {
      console.log('redirect to login')
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    // Accessing login route if already logged in, move to profile
    if (to.name === 'login') {
      console.log('redirect to profile')
      next({ name: 'profile' })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
const app = createApp(App)
const head = createHead()
app.use(head)
app.use(router)
app.mount('#app')
