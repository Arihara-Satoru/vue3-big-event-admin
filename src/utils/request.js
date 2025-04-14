import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code !== 0) {
      return res
    }
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    ElMessage.error(res.data.message || '请求失败')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    if (err.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(err.data.message || '请求失败')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
