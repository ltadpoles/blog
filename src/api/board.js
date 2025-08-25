import http from '@/utils/http'

// 提交留言
export const addBoard = data => {
  return http.post('/board/add', data)
}

// 获取留言列表
export const getBoardList = params => {
  return http.get('/board/list', { params })
}
