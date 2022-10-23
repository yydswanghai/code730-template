import { createApp } from 'vue'
import App from './pages/IndexPage/App.vue'
import { router } from './pages/IndexPage/router'
import { store } from '@/store/'
import '@/styles/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'

createApp(App).use(router).use(store).use(Vant).mount('#app')