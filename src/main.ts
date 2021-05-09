import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import NProgress from 'nprogress'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/main.css'
import Index from './pages/index.vue'
import Game from './pages/game.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/game', component: Game },
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach(() => { NProgress.start() })
router.afterEach(() => { NProgress.done() })
const app = createApp(App)
const head = createHead()
app.use(head)
app.use(router)
app.mount('#app')
