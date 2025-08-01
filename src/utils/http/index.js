import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

const http = axios.create({
  timeout: 3000,
  baseURL: import.meta.env.VITE_HTTP_BASEURL
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
      message.error(response.data.msg)
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
          message.error(error.response.data.msg || '请求错误')
          break
        case 401:
          message.error('请求错误')
          break
        case 403:
          message.error('您没有相关权限')
          break
        case 404:
          message.error('请求链接不存在')
          break
        case 500:
          message.error('服务器错误，请稍后再试')
          break
        default:
          message.error('系统异常，请稍后再试')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
)

export default http
