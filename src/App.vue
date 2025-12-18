<script setup>
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import en from 'element-plus/es/locale/lang/en.mjs'
import { useI18nStore } from '@/stores/modelus/i18n'
import HealthFloatingPanel from '@/components/HealthFloatingPanel.vue'

const i18nStore = useI18nStore()
const locale = computed(() => (i18nStore.locale === 'zh' ? zhCn : en))
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
    <health-floating-panel />
  </el-config-provider>
</template>

<style scoped></style>
