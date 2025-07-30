import http from '@/utils/http'

// 获取用户信息
export const getUserInfo = () => {
  return http.get('/getUserInfo')
}
