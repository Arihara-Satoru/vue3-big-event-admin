// 导入请求工具库
import request from '@/utils/request'

/**
 * 获取频道列表
 * 该函数通过发送GET请求来获取所有频道的信息
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const artGetChannelsService = () => request.get('/my/cate/list')

/**
 * 添加频道
 * 该函数通过发送POST请求来添加一个新的频道
 * @param {Object} data - 包含要添加频道的信息的对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

/**
 * 编辑频道
 * 该函数通过发送PUT请求来更新频道的信息
 * @param {Object} data - 包含要更新频道的新信息的对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

/**
 * 删除频道
 * 该函数通过发送DELETE请求来删除指定的频道
 * @param {string} id - 要删除频道的唯一标识符
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

/**
 * 获取文章列表
 * 该函数通过发送GET请求来获取所有文章的信息
 * @param {Object} params - 包含请求参数的对象，用于指定获取文章的条件
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })

/**
 * 删除文章
 * 该函数通过发送DELETE请求来删除指定的文章
 * @param {string} id - 要删除文章的唯一标识符
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const articleDelService = (id) =>
  request.delete('/my/article/info', {
    params: { id }
  })

/**
 * 发布文章
 * 该函数通过发送POST请求来发布新的文章
 * @param {Object} data - 包含要发布文章的信息的对象
 * @returns {Promise} 返回一个Promise对象，包含请求结果
 */
export const artPublishService = (data) => request.post('/my/article/add', data)

export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

export const artEditService = (data) => request.put('my/article/info', data)
