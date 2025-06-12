// posts.data.js
import { createContentLoader } from 'vitepress'
import { formatDate } from '../utils'

/**
 * 加载所有博客文章并处理元数据
 */
export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw) {
    // 按日期排序（最新的在前面）
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        url,
        title: frontmatter.title,
        description: frontmatter.description,
        date: formatDate(frontmatter.date),
        tags: frontmatter.tags || [],
        author: frontmatter.author,
        cover: frontmatter.cover,
        excerpt,
        // 用于排序的原始日期
        rawDate: frontmatter.date ? new Date(frontmatter.date) : new Date(0)
      }))
      .sort((a, b) => b.rawDate - a.rawDate)
  }
})