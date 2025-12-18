import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useI18nStore = defineStore(
  'big-i18n',
  () => {
    const locale = ref(localStorage.getItem('big-locale') || 'zh')

    const setLocale = (newLocale) => {
      locale.value = newLocale
      localStorage.setItem('big-locale', newLocale)
    }

    return {
      locale,
      setLocale
    }
  },
  {
    persist: true
  }
)
