<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDraggable } from '@vueuse/core'
import { useHealthStore } from '@/stores/modelus/health'
import { storeToRefs } from 'pinia'

const el = ref(null)
const { x, y } = useDraggable(el, {
  initialValue: { x: window.innerWidth - 220, y: window.innerHeight - 150 }
})

const healthStore = useHealthStore()
const { metrics } = storeToRefs(healthStore)

onMounted(() => {
  healthStore.startMonitoring()
})

onUnmounted(() => {
  healthStore.stopMonitoring()
})
</script>

<template>
  <div
    ref="el"
    class="health-floating-panel"
    :style="{ left: x + 'px', top: y + 'px' }">
    <div class="panel-header">🚀 Performance</div>
    <div class="panel-body">
      <div class="metric-item">
        <span>FP:</span>
        <span :class="metrics.fp > 1000 ? 'warning' : 'success'">
          {{ metrics.fp.toFixed(2) }}ms
        </span>
      </div>
      <div class="metric-item">
        <span>API:</span>
        <span :class="metrics.api > 500 ? 'warning' : 'success'">
          {{ metrics.api.toFixed(2) }}ms
        </span>
      </div>
      <div class="metric-item">
        <span>Health:</span>
        <span :class="metrics.healthScore < 80 ? 'danger' : 'success'">
          {{ metrics.healthScore.toFixed(0) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.health-floating-panel {
  position: fixed;
  width: 180px;
  background: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
  z-index: 9999;
  padding: 10px;
  cursor: move;
  user-select: none;
  font-size: 12px;

  .panel-header {
    font-weight: bold;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--el-border-color);
    padding-bottom: 4px;
  }

  .metric-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;

    .success {
      color: #67c23a;
    }
    .warning {
      color: #e6a23c;
    }
    .danger {
      color: #f56c6c;
    }
  }
}
</style>
