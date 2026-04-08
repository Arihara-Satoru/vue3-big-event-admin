import { fileURLToPath, URL } from 'node:url'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('element-plus')) return 'element-plus'
          if (id.includes('@element-plus/icons-vue'))
            return 'element-plus-icons'
          if (id.includes('@vueup/vue-quill') || id.includes('quill'))
            return 'quill'
          if (id.includes('echarts')) return 'echarts'
          if (id.includes('vue-i18n')) return 'vue-i18n'
          if (id.includes('vue-router')) return 'vue-router'
          if (id.includes('pinia')) return 'pinia'
          if (id.includes('axios')) return 'axios'
          if (id.includes('@vueuse/core')) return 'vueuse'

          return 'vendor'
        }
      }
    }
  }
})
