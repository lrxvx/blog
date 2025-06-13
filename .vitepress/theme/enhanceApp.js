// .vitepress/theme/enhanceApp.js

/**
 * 增强应用程序，添加全局功能
 * @param {Object} ctx - VitePress 上下文
 */
export function enhanceApp(ctx) {
  // 在这里添加全局功能
}

/**
 * 为每个页面添加 SEO 相关的元数据
 * @param {Object} pageData - 页面数据
 */
export function extendPageData(pageData) {
  // 获取页面的 frontmatter
  const { frontmatter, title, description } = pageData
  
  // 如果是文章页面，添加 SEO 相关的元数据
  if (pageData.relativePath.startsWith('posts/') && pageData.relativePath !== 'posts/index.md') {
    // 设置默认的 SEO 标题和描述
    if (!frontmatter.head) frontmatter.head = []
    
    // 添加 Open Graph 和 Twitter Card 元数据
    const ogTitle = frontmatter.title || title
    const ogDescription = frontmatter.description || description
    const ogImage = frontmatter.cover || 'https://yourdomain.com/images/og-image.jpg'
    const ogUrl = `https://yourdomain.com${pageData.relativePath.replace(/\.md$/, '.html')}`
    
    // 添加 Open Graph 元数据
    frontmatter.head.push(
      ['meta', { property: 'og:title', content: ogTitle }],
      ['meta', { property: 'og:description', content: ogDescription }],
      ['meta', { property: 'og:url', content: ogUrl }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:type', content: 'article' }]
    )
    
    // 添加 Twitter Card 元数据
    frontmatter.head.push(
      ['meta', { name: 'twitter:title', content: ogTitle }],
      ['meta', { name: 'twitter:description', content: ogDescription }],
      ['meta', { name: 'twitter:image', content: ogImage }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
    )
    
    // 如果有标签，添加关键词元数据
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      frontmatter.head.push(
        ['meta', { name: 'keywords', content: frontmatter.tags.join(',') }]
      )
    }
    
    // 如果有作者，添加作者元数据
    if (frontmatter.author) {
      frontmatter.head.push(
        ['meta', { name: 'author', content: frontmatter.author }]
      )
    }
    
    // 添加文章发布日期元数据
    if (frontmatter.date) {
      frontmatter.head.push(
        ['meta', { property: 'article:published_time', content: new Date(frontmatter.date).toISOString() }]
      )
    }
  }
}