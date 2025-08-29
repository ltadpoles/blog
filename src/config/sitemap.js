// Sitemap 配置文件
export const sitemapConfig = {
  // 网站基础信息
  siteName: '游荡de蝌蚪',
  siteDescription: '游荡de蝌蚪的个人博客，分享前端开发、Vue.js、JavaScript等技术文章和生活碎片',
  author: '游荡de蝌蚪',
  keywords: '个人博客,技术博客,前端开发,Vue.js,JavaScript,编程,技术分享,生活随笔',

  // 网站URL配置
  siteUrl: 'https://www.yddekd.com', // 网站URL

  // 默认图片
  defaultImage: '/logo.svg',

  // 社交媒体配置
  social: {
    github: 'ltadpoles'
  },

  // 静态路由配置
  staticRoutes: [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    },
    {
      url: '/archive',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    {
      url: '/about',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString()
    },
    {
      url: '/board',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    {
      url: '/category',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    {
      url: '/tag',
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  ],

  // 动态路由生成函数
  async generateDynamicRoutes() {
    const routes = []

    try {
      // 获取文章列表 - 分批获取所有文章
      let pageNum = 1
      const pageSize = 100 // 每页获取100篇文章
      let hasMore = true

      while (hasMore) {
        const articlesResponse = await fetch('http://127.0.0.1:3000/api/article/page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pageNum,
            pageSize
          })
        })

        if (articlesResponse.ok) {
          const articlesData = await articlesResponse.json()
          if (articlesData && articlesData.data && Array.isArray(articlesData.data.list)) {
            // 添加文章详情页路由
            routes.push(
              ...articlesData.data.list.map(article => ({
                url: `/article/${article.id}`,
                changefreq: 'monthly',
                priority: 0.9,
                lastmod: article.updateTime || article.createTime || new Date().toISOString()
              }))
            )

            // 检查是否还有更多数据
            hasMore = articlesData.data.list.length === pageSize && pageNum * pageSize < articlesData.data.total
            pageNum++
          } else {
            hasMore = false
          }
        } else {
          hasMore = false
        }
      }

      // 获取分类统计列表
      const categoriesResponse = await fetch('http://127.0.0.1:3000/api/article/countArticlesByCategory')
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        if (categoriesData && categoriesData.data && Array.isArray(categoriesData.data)) {
          // 添加分类页路由
          routes.push(
            ...categoriesData.data.map(category => ({
              url: `/category/${category.id}`,
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: new Date().toISOString()
            }))
          )
        }
      }

      // 获取标签统计列表
      const tagsResponse = await fetch('http://127.0.0.1:3000/api/article/countArticlesByTag')
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json()
        if (tagsData && tagsData.data && Array.isArray(tagsData.data)) {
          // 添加标签页路由
          routes.push(
            ...tagsData.data.map(tag => ({
              url: `/tag/${tag.id}`,
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: new Date().toISOString()
            }))
          )
        }
      }

      // 获取文章归档数据
      const archiveResponse = await fetch('http://127.0.0.1:3000/api/article/archive')
      if (archiveResponse.ok) {
        const archiveData = await archiveResponse.json()
        if (archiveData && archiveData.data) {
          // 归档页面已在静态路由中，这里可以根据归档数据添加特定年份的路由
          // 如果需要按年份归档的路由，可以在这里添加
        }
      }

      // 获取留言板数据 - 分批获取
      let boardPageNum = 1
      const boardPageSize = 100
      let boardHasMore = true

      while (boardHasMore) {
        const boardResponse = await fetch('http://127.0.0.1:3000/api/board/page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pageNum: boardPageNum,
            pageSize: boardPageSize
          })
        })

        if (boardResponse.ok) {
          const boardData = await boardResponse.json()
          if (boardData && boardData.data && Array.isArray(boardData.data.list)) {
            // 留言板页面已在静态路由中，这里主要是为了触发数据更新
            // 如果需要为单个留言创建路由，可以在这里添加

            // 检查是否还有更多数据
            boardHasMore =
              boardData.data.list.length === boardPageSize && boardPageNum * boardPageSize < boardData.data.total
            boardPageNum++
          } else {
            boardHasMore = false
          }
        } else {
          boardHasMore = false
        }
      }

      // 获取评论数据 - 这里主要是为了sitemap的完整性，评论通常不需要独立的路由
      const commentResponse = await fetch('http://127.0.0.1:3000/api/comment/page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pageNum: 1,
          pageSize: 100
        })
      })
      if (commentResponse.ok) {
        // 评论数据获取成功，主要用于sitemap生成时的数据完整性检查
      }

      // 获取统计信息 - 用于sitemap元数据
      const statsResponse = await fetch('http://127.0.0.1:3000/api/article/stats')
      if (statsResponse.ok) {
        // 统计信息获取成功，可用于sitemap优先级调整等
      }
    } catch {
      // API调用失败时静默处理，返回空数组
    }

    return routes
  },

  // robots.txt配置
  robotsConfig: {
    userAgent: '*',
    allow: ['/', '/article/', '/category/', '/tag/', '/archive', '/about', '/board'],
    disallow: [
      // 如果有不希望被索引的路径，可以在这里添加
      // '/admin/',
      // '/api/'
    ],
    sitemap: 'https://www.yddekd.com/sitemap.xml', // sitemap地址
    crawlDelay: 1
  }
}

// 生成完整的sitemap路由配置
export async function generateSitemapRoutes() {
  const staticRoutes = sitemapConfig.staticRoutes
  const dynamicRoutes = await sitemapConfig.generateDynamicRoutes()

  return [...staticRoutes, ...dynamicRoutes]
}
