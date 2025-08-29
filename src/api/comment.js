import http from '@/utils/http'

// 提交文章评论
export const addComment = data => {
  return http.post('/comment/add', data)
}

// 获取文章评论列表
export const getCommentPage = data => {
  return http.post('/comment/page', data)
}

// 获取文章评论回复列表
export const getCommentList = params => {
  return http.get('/comment/list', { params })
}
