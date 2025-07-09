import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: frontmatter.date,
        tags: frontmatter.tags || [],
        author: frontmatter.author,
        cover: frontmatter.cover,
        description: frontmatter.description
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})