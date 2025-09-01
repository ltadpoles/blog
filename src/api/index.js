/**
 * 通用 API 接口
 * 提供统计数据相关的 API 服务
 */

import http from '@/utils/http'

/**
 * 获取站点统计数据
 * @returns {Promise} 返回站点统计信息
 */
export const statistics = () => {
  return http.get('/article/stats')
}

/**
 * 获取分类文章统计
 * @returns {Promise} 返回各分类下文章数量
 */
export const categoryStatistics = () => {
  return http.get('/article/countArticlesByCategory')
}

/**
 * 获取标签文章统计
 * @returns {Promise} 返回各标签下文章数量
 */
export const tagStatistics = () => {
  return http.get('/article/countArticlesByTag')
}
