import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }

    const setUserInfo = () => {
      userInfo.value = {}
    }

    return {
      token,
      setToken,
      userInfo,
      getUserInfo,
      removeToken,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
