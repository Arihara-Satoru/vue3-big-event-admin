<script setup>
import { provide, ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const channelList = ref([])
const isLoading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  isLoading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  isLoading.value = false
  // console.log(res)
}

getChannelList()
provide('updateChannelList', getChannelList)
const onEditChannel = (row) => {
  dialog.value.openDialog(row)
  console.log(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm(
    t('article.confirmDeleteChannel'),
    t('common.tip'),
    {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    }
  )
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: t('common.deleteSuccess') })
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.openDialog({})
}
</script>

<template>
  <page-container :title="$t('article.channel')">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">
        {{ $t('article.addChannel') }}
      </el-button>
    </template>

    <el-table v-loading="isLoading" :data="channelList" style="width: 100%">
      <el-table-column
        :label="$t('common.index')"
        width="100"
        type="index"></el-table-column>
      <el-table-column
        :label="$t('article.channelName')"
        prop="cate_name"></el-table-column>
      <el-table-column
        :label="$t('article.channelAlias')"
        prop="cate_alias"></el-table-column>
      <el-table-column :label="$t('common.operation')" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :description="$t('common.noData')" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog"></ChannelEdit>
  </page-container>
</template>

<style></style>
