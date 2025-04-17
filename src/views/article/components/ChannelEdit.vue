<script setup>
import { ref, inject } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article'
const dialogVisible = ref(false)

const formRef = ref()

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

const openDialog = async (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row }
}

const updateChannelList = inject('updateChannelList')
/**
 * 提交表单的异步函数
 * 此函数没有直接的参数，但它依赖于外部定义的 formRef 和 formModel
 * 它根据 formModel 中的数据决定是添加还是编辑一个频道
 * 在操作成功后，它会显示一个消息提示用户，并关闭对话框
 */
const onSubmit = async () => {
  await formRef.value.validate()
  console.log(formRef.value)

  // 根据 formModel 的 id 属性决定是调用编辑服务还是添加服务
  formModel.value.id
    ? await artEditChannelService(formModel.value)
    : await artAddChannelService(formModel.value)

  // 显示成功消息，具体文本取决于是编辑还是添加操作
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })

  // 关闭对话框
  dialogVisible.value = false
  updateChannelList()
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          minlength="1"
          maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          minlength="1"
          maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style></style>
