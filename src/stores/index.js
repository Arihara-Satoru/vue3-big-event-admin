import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
// app.use(createPinia().use(persist))

const pinia = createPinia()
pinia.use(persist)

export default pinia
