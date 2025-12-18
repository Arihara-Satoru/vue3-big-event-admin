<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useHealthStore } from '@/stores/modelus/health'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const healthStore = useHealthStore()
const { metrics } = storeToRefs(healthStore)

const chartRef = ref(null)
let myChart = null

const initChart = () => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)
    updateChart()
  }
}

const updateChart = () => {
  if (!myChart) return

  const option = {
    title: {
      text: t('health.title')
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: metrics.value.history.map((h) => h.time)
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    series: [
      {
        name: t('health.status'),
        type: 'line',
        smooth: true,
        data: metrics.value.history.map((h) => h.score),
        areaStyle: {},
        itemStyle: {
          color: '#409eff'
        }
      }
    ]
  }
  myChart.setOption(option)
}

watch(
  () => metrics.value.history,
  () => {
    updateChart()
  },
  { deep: true }
)

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => myChart?.resize())
})
</script>

<template>
  <page-container :title="$t('nav.health')">
    <div class="health-dashboard">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover">
            <template #header>{{ $t('health.fp') }}</template>
            <div class="metric-value">{{ metrics.fp.toFixed(2) }} ms</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <template #header>{{ $t('health.api') }}</template>
            <div class="metric-value">{{ metrics.api.toFixed(2) }} ms</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <template #header>{{ $t('health.status') }}</template>
            <div
              class="metric-value"
              :class="metrics.healthScore > 90 ? 'success' : 'warning'">
              {{ metrics.healthScore.toFixed(0) }}%
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-card class="chart-card" shadow="hover">
        <div ref="chartRef" style="height: 400px"></div>
      </el-card>
    </div>
  </page-container>
</template>

<style scoped lang="scss">
.health-dashboard {
  .metric-value {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding: 10px 0;

    &.success {
      color: #67c23a;
    }
    &.warning {
      color: #e6a23c;
    }
  }

  .chart-card {
    margin-top: 20px;
  }
}
</style>
