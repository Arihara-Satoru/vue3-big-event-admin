import '@/assets/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import pinia from '@/stores/index'
import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('big-locale') || 'zh',
  messages: {
    zh,
    en
  }
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
