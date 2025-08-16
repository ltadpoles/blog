import http from '@/utils/http'

// 文章列表
export const articlepage = data => {
  return http.post('/article/page', data)
}
