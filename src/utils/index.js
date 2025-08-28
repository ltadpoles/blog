// 获取assets静态资源，动态传入文件路径
export const getSvgUrl = url => {
  return new URL(`../assets/svg/${url}`, import.meta.url).href
}

// 获取assets静态资源，动态传入文件路径
export const getImageUrl = url => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

/**
 * XSS防护工具函数
 */
export const xssUtils = {
  /**
   * 转义HTML特殊字符，防止XSS攻击
   * @param {string} str - 需要转义的字符串
   * @returns {string} 转义后的字符串
   */
  escapeHtml(str) {
    if (typeof str !== 'string') {
      return str
    }

    const htmlEscapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    }

    return str.replace(/[&<>"'`=/]/g, match => htmlEscapeMap[match])
  },

  /**
   * 过滤危险标签和属性
   * @param {string} str - 需要过滤的字符串
   * @returns {string} 过滤后的字符串
   */
  filterDangerousTags(str) {
    if (typeof str !== 'string') {
      return str
    }

    // 移除所有HTML标签
    let filtered = str.replace(/<[^>]*>/g, '')

    // 移除JavaScript事件处理器
    filtered = filtered.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')

    // 移除javascript:协议
    filtered = filtered.replace(/javascript:/gi, '')

    // 移除data:协议（可能包含恶意代码）
    filtered = filtered.replace(/data:/gi, '')

    return filtered
  },

  /**
   * 综合XSS防护处理
   * @param {string} str - 需要处理的字符串
   * @param {object} options - 配置选项
   * @param {boolean} options.allowHtml - 是否允许HTML标签（默认true）
   * @param {boolean} options.escapeHtml - 是否转义HTML字符（默认false）
   * @returns {string} 处理后的字符串
   */
  sanitize(str, options = {}) {
    if (typeof str !== 'string') {
      return str
    }

    const { allowHtml = true, escapeHtml = false } = options
    let result = str

    // 如果不允许HTML，则过滤所有HTML标签
    if (!allowHtml) {
      result = this.filterDangerousTags(result)
    }

    // 如果需要转义HTML字符
    if (escapeHtml) {
      result = this.escapeHtml(result)
    }

    return result
  },

  /**
   * 验证输入内容是否包含危险字符
   * @param {string} str - 需要验证的字符串
   * @returns {object} 验证结果
   */
  validateInput(str) {
    if (typeof str !== 'string') {
      return { isValid: true, message: '' }
    }

    // 检查是否包含JavaScript事件（允许HTML标签作为字符串）
    const hasJsEvents = /on\w+\s*=/gi.test(str)

    // 检查是否包含JavaScript协议
    const hasJsProtocol = /javascript:/gi.test(str)

    // 检查是否包含SQL注入特征
    const hasSqlInjection =
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)|(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi.test(str)

    if (hasJsEvents || hasJsProtocol || hasSqlInjection) {
      return {
        isValid: false,
        message: '输入内容包含不安全字符，请重新输入'
      }
    }

    return { isValid: true, message: '' }
  }
}
