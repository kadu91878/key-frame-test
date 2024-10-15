

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
// import 'primevue/resources/themes/saga-blue/theme.css';   // Tema do PrimeVue
// import 'primevue/resources/primevue.min.css';             // Componentes principais
// import 'primeicons/primeicons.css';                       // Ícones
// import 'primeflex/primeflex.css';   

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
