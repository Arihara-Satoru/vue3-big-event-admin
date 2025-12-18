import { defineStore } from 'pinia'
import { ref } from 'vue'
import { performanceMonitor, simulateAIData } from '@/utils/performance'

export const useHealthStore = defineStore('big-health', () => {
  const metrics = ref({
    fp: 0,
    api: 0,
    healthScore: 100,
    history: []
  })

  let timer = null

  const updateMetrics = () => {
    const realData = performanceMonitor.getMetrics()
    const aiData = simulateAIData()

    metrics.value = {
      fp: realData.fp || aiData.fp,
      api: aiData.api,
      healthScore: aiData.healthScore,
      history: [
        ...metrics.value.history,
        { time: new Date().toLocaleTimeString(), score: aiData.healthScore }
      ].slice(-10)
    }
  }

  const startMonitoring = () => {
    performanceMonitor.init()
    updateMetrics()
    timer = setInterval(updateMetrics, 3000)
  }

  const stopMonitoring = () => {
    if (timer) clearInterval(timer)
  }

  return {
    metrics,
    startMonitoring,
    stopMonitoring
  }
})
