import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import directives from './directives'

const app = createApp(App)
const store = createPinia()
directives.forEach((directive) => app.directive(directive.name, directive))
app.use(store).use(router).mount('#app')
