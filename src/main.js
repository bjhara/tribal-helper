import './assets/css/main.css'
import 'primeicons/primeicons.css'
import './assets/css/mana.min.css'

import { createApp } from 'vue'
import router from '@/router'
import PrimeVue from 'primevue/config'
import Wind from '@/assets/presets/wind';
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Wind
})
app.mount('#app')
