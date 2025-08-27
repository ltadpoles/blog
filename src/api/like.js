import http from '@/utils/http'

// 点赞/取消点赞
export const toggleLike = data => {
  return http.post('/like/toggle', data)
}

// 获取用户点赞过的实体
export const likeUserLikes = data => {
  return http.post('/like/user-likes', data)
}
