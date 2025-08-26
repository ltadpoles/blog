import config from '@/config'
import axios from 'axios'
import { ElNotification } from 'element-plus'

const http = axios.create({
  timeout: 3000,
  baseURL: config.BASEURL || '/api'
})

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === '500' || response.data.code === '403') {
      ElNotification({
        message: response.data.msg,
        type: 'error'
      })
      return Promise.reject(response.data.msg)
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    try {
      switch (error.response.status) {
        case 400:
          ElNotification({
            message: error.response.data.msg || '请求错误',
            type: 'error'
          })
          break
        case 401:
          ElNotification({
            message: '请求错误',
            type: 'error'
          })
          break
        case 403:
          ElNotification({
            message: '您没有相关权限',
            type: 'error'
          })
          break
        case 404:
          ElNotification({
            message: '请求链接不存在',
            type: 'error'
          })
          break
        case 500:
          ElNotification({
            message: '服务器错误，请稍后再试',
            type: 'error'
          })
          break
        default:
          ElNotification({
            message: '系统异常，请稍后再试',
            type: 'error'
          })
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
)

export default http
