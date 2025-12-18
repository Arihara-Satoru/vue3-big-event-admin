<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService, articleDelService } from '@/api/article'
import { formatTime } from '@/utils/format'
import articleEdit from './components/articleEdit.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// 假数据
const articleList = ref([])
const total = ref(0)
const loading = ref(false)
const articleEditRef = ref()

// const cardId = ref()

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const GetListService = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
  // console.log(res)
}

const onPublish = () => {
  articleEditRef.value.showDrawer({})
}
const onEditArticle = (row) => {
  articleEditRef.value.showDrawer(row)
  // console.log(row)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm(
    t('article.confirmDeleteChannel'),
    t('common.tip'),
    {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    }
  )
  await articleDelService(row.id)
  GetListService()
}

const onSizeChange = () => {
  params.value.pagenum = 1
  GetListService()
}

const onCurrentChange = () => {
  GetListService()
}

const onSearch = () => {
  params.value.pagenum = 1
  console.log(params.value)
  GetListService()
}

const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  GetListService()
}

const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  GetListService()
}

onMounted(() => {
  GetListService()
})
</script>

<template>
  <page-container :title="$t('article.manage')">
    <template #extra>
      <el-button @click="onPublish" type="primary">
        {{ $t('common.add') }}
      </el-button>
    </template>

    <el-form inline>
      <el-form-item
        style="min-width: 300px"
        :label="$t('article.channel') + '：'">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item
        style="min-width: 300px"
        :label="$t('article.state') + '：'">
        <el-select v-model="params.state">
          <el-option
            :label="$t('article.published')"
            value="已发布"></el-option>
          <el-option :label="$t('article.draft')" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">
          {{ $t('article.search') }}
        </el-button>
        <el-button @click="onReset">{{ $t('article.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column :label="$t('article.title')" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('article.channel')"
        prop="cate_name"></el-table-column>
      <el-table-column :label="$t('article.pubDate')" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('article.state')"
        prop="state"></el-table-column>
      <el-table-column :label="$t('common.operation')" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :description="$t('common.noData')" />
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end" />
    <articleEdit ref="articleEditRef" @success="onSuccess"></articleEdit>
  </page-container>
</template>
