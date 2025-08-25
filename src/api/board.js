import http from '@/utils/http'

// 提交留言
export const addMessage = data => {
  return http.post('/message/add', data)
}

// （可选）获取留言列表
export const getMessageList = params => {
  return http.get('/message/list', { params })
}
