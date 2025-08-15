import http from '@/utils/http'

// 统计
export const statistics = () => {
  return http.get('/article/stats')
}

// 分类文章统计
export const categoryStatistics = () => {
  return http.get('/article/countArticlesByCategory')
}

// 标签文章统计
export const tagStatistics = () => {
  return http.get('/article/countArticlesByTag')
}
