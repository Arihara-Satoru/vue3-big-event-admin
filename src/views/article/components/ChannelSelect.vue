<script setup>
// 导入 Vue 的生命周期钩子和响应式对象
import { onMounted, ref } from 'vue'
// 导入获取频道列表的服务函数
import { artGetChannelsService } from '@/api/article'

// 创建一个响应式数组，用于存储频道列表数据
const channelList = ref([])
/**
 * 异步函数：获取频道列表
 * 该函数在组件挂载时调用，以初始化频道列表数据
 */
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  // console.log(channelList.value)
}

// 定义 modelValue 以与父组件进行数据绑定
const modelValue = defineModel()

// 在组件挂载时，调用 getChannelList 函数获取频道列表
onMounted(() => {
  getChannelList()
})
</script>

<template>
  <!-- 使用 Element UI 的选择框组件，绑定 modelValue，并动态生成选项 -->
  <el-select v-model="modelValue">
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"></el-option>
  </el-select>
</template>
