import http from '@/utils/http'

// 文章列表
export const articlepage = data => {
  return http.post('/article/page', data)
}

// 文章详情
export const articleDetail = params => {
  return http.get('/article/info', { params })
}

// 归档
export const articleArchive = () => {
  return http.get('/article/archive')
}
