// 性能埋点脚本
export const performanceMonitor = {
  data: {
    fp: 0, // First Paint
    fcp: 0, // First Contentful Paint
    apiResponseTimes: []
  },

  init() {
    this.observePaint()
    this.observeResource()
  },

  observePaint() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-paint') {
          this.data.fp = entry.startTime
        } else if (entry.name === 'first-contentful-paint') {
          this.data.fcp = entry.startTime
        }
      }
    })
    observer.observe({ type: 'paint', buffered: true })
  },

  observeResource() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (
          entry.initiatorType === 'fetch' ||
          entry.initiatorType === 'xmlhttprequest'
        ) {
          this.data.apiResponseTimes.push({
            name: entry.name,
            duration: entry.duration,
            time: Date.now()
          })
          // 只保留最近 20 条
          if (this.data.apiResponseTimes.length > 20) {
            this.data.apiResponseTimes.shift()
          }
        }
      }
    })
    observer.observe({ type: 'resource', buffered: true })
  },

  getMetrics() {
    return {
      ...this.data,
      timestamp: Date.now()
    }
  }
}

// 模拟 AI 数据变化规律
export const simulateAIData = () => {
  const baseFP = 300 + Math.random() * 200
  const baseAPI = 100 + Math.random() * 100

  // 模拟波动
  const fluctuation = Math.sin(Date.now() / 5000) * 50

  return {
    fp: baseFP + fluctuation,
    api: baseAPI + fluctuation,
    healthScore: Math.max(0, Math.min(100, 95 - fluctuation / 10))
  }
}
