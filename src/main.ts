import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'layouts-generated'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import NProgress from 'nprogress'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/main.css'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach(() => { NProgress.start() })
router.afterEach(() => { NProgress.done() })
const app = createApp(App)
const head = createHead()
app.use(head)
app.use(router)
app.mount('#app')
