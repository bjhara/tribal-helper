import './assets/css/main.css'
import 'primeicons/primeicons.css'
import './assets/css/mana.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import PrimeVue from 'primevue/config'
import Wind from '@/assets/presets/wind'
import App from './App.vue'
import UniqueId from './plugins/vue-unique-id'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Wind
})
app.use(UniqueId)
app.mount('#app')
