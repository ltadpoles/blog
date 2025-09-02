/**
 * HTTP 请求封装
 * 基于 Axios 实现，提供统一的请求/响应拦截和错误处理
 */

import config from '@/config'
import axios from 'axios'
import { ElNotification } from 'element-plus'

// 全局维护通知实例，确保同一时间只有一个维护通知
let maintenanceNotification = null

// 创建 Axios 实例
const http = axios.create({
  timeout: 3000,
  baseURL: config.BASEURL || '/api'
})

/**
 * 请求拦截器
 * 在请求发送前进行预处理
 */
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 处理维护状态
 * 当遇到 503 状态码时，定向到维护页面
 */
const handleMaintenance = () => {
  // 检查当前 URL 是否已经在维护页面
  if (typeof window !== 'undefined' && window.location.pathname !== '/maintenance') {
    // 如果已经存在维护通知，先关闭它
    if (maintenanceNotification) {
      maintenanceNotification.close()
    }

    // 显示通知
    maintenanceNotification = ElNotification({
      message: '系统维护中，正在跳转到维护页面...',
      type: 'warning',
      duration: 3000
    })

    // 跳转到维护页面
    window.location.replace('/maintenance')
  }
}

/**
 * 响应拦截器
 * 统一处理响应数据和错误状态
 */
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
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
    // 超出 2xx 范围的状态码都会触发该函数
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
        case 429:
          ElNotification({
            message: '访问频繁，请稍后再试',
            type: 'error'
          })
          break
        case 500:
          ElNotification({
            message: '服务器错误，请稍后再试',
            type: 'error'
          })
          break
        case 503:
          // 直接调用维护处理函数
          handleMaintenance()
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
