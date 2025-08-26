import http from '@/utils/http'

// 获取用户信息
export const userInfo = () => {
  return http.get('/getInfo')
}
