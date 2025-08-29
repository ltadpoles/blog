// Sitemap 工具函数
import { sitemapConfig } from '../config/sitemap.js'

/**
 * 更新sitemap配置中的域名
 * @param {string} hostname - 新的域名
 */
export function updateSitemapHostname(hostname) {
  sitemapConfig.hostname = hostname
  sitemapConfig.robotsConfig.sitemap = `${hostname}/sitemap.xml`
}

/**
 * 添加自定义路由到sitemap
 * @param {Object} route - 路由配置对象
 * @param {string} route.url - 路由路径
 * @param {string} route.changefreq - 更新频率
 * @param {number} route.priority - 优先级
 * @param {string} route.lastmod - 最后修改时间
 */
export function addCustomRoute(route) {
  sitemapConfig.staticRoutes.push({
    url: route.url,
    changefreq: route.changefreq || 'weekly',
    priority: route.priority || 0.5,
    lastmod: route.lastmod || new Date().toISOString()
  })
}

/**
 * 生成文章路由配置
 * @param {Object} article - 文章对象
 * @returns {Object} sitemap路由配置
 */
export function generateArticleRoute(article) {
  return {
    url: `/article/${article.id}`,
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: article.updateTime || article.createTime || new Date().toISOString()
  }
}

/**
 * 生成分类路由配置
 * @param {Object} category - 分类对象
 * @returns {Object} sitemap路由配置
 */
export function generateCategoryRoute(category) {
  return {
    url: `/category/${category.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  }
}

/**
 * 生成标签路由配置
 * @param {Object} tag - 标签对象
 * @returns {Object} sitemap路由配置
 */
export function generateTagRoute(tag) {
  return {
    url: `/tag/${tag.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  }
}

/**
 * 验证sitemap配置
 * @returns {boolean} 配置是否有效
 */
export function validateSitemapConfig() {
  if (!sitemapConfig.hostname || !sitemapConfig.hostname.startsWith('http')) {
    // Sitemap配置错误：hostname必须是一个有效的URL
    return false
  }

  if (!Array.isArray(sitemapConfig.staticRoutes)) {
    // Sitemap配置错误：staticRoutes必须是一个数组
    return false
  }

  return true
}

/**
 * 获取sitemap统计信息
 * @returns {Promise<Object>} 统计信息
 */
export async function getSitemapStats() {
  const staticCount = sitemapConfig.staticRoutes.length
  const dynamicRoutes = await sitemapConfig.generateDynamicRoutes()
  const dynamicCount = dynamicRoutes.length

  return {
    staticRoutes: staticCount,
    dynamicRoutes: dynamicCount,
    totalRoutes: staticCount + dynamicCount,
    lastGenerated: new Date().toISOString()
  }
}
