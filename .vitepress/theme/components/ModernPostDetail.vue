<template>
  <div class="modern-post-detail">
    <!-- 文章头部 -->
    <header v-if="!isPostListPage" class="post-header">
      <div class="header-background">
        <div v-if="frontmatter.cover" class="cover-image">
          <img :src="frontmatter.cover" :alt="frontmatter.title" />
        </div>
        <div v-else class="cover-gradient"></div>
        <div class="header-overlay"></div>
      </div>
      
      <div class="header-content">
        <nav class="breadcrumb">
          <a href="/" class="breadcrumb-link">首页</a>
          <span class="breadcrumb-separator">></span>
          <a href="/posts/" class="breadcrumb-link">文章</a>
          <span class="breadcrumb-separator">></span>
          <a v-if="currentTag" :href="`/posts/?category=${encodeURIComponent(currentTag)}`" class="breadcrumb-link">{{ currentTag }}</a>
          <span v-if="currentTag" class="breadcrumb-separator">></span>
          <span class="breadcrumb-current">{{ frontmatter.title }}</span>
        </nav>
        
        <h1 class="post-title">{{ frontmatter.title }}</h1>
        
        <div class="post-meta">
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <time>{{ formatDate(frontmatter.date) }}</time>
          </div>
          
          <div v-if="frontmatter.author" class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{{ frontmatter.author }}</span>
          </div>
          
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>{{ readingTime }}分钟阅读</span>
          </div>
        </div>
        
        <div v-if="frontmatter.description" class="post-description">
          {{ frontmatter.description }}
        </div>
        
        <div v-if="frontmatter.tags && frontmatter.tags.length" class="post-tags">
          <span 
            v-for="tag in frontmatter.tags"
            :key="tag"
            class="post-tag"
            @click="navigateToTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class="post-container" :class="{ 'list-page': isPostListPage }">
      <!-- 左侧目录 -->
      <aside v-if="!isPostListPage" class="post-sidebar">
        <div class="sidebar-sticky">
          <div class="toc-container">
            <h3 class="toc-title">
              <svg class="toc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              目录
            </h3>
            <nav class="toc-nav">
              <ul class="toc-list">
                <li 
                  v-for="(heading, index) in headings"
                  :key="index"
                  :class="['toc-item', `toc-level-${heading.level}`, { active: activeHeading === heading.anchor }]"
                >
                  <a 
                    :href="`#${heading.anchor}`"
                    class="toc-link"
                    @click="scrollToHeading(heading.anchor)"
                  >
                    {{ heading.title }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <!-- 文章操作 -->
          <div class="post-actions">
            <button class="action-btn" @click="toggleBookmark" :class="{ active: isBookmarked }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{{ isBookmarked ? '已收藏' : '收藏' }}</span>
            </button>
            
            <button class="action-btn" @click="sharePost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>分享</span>
            </button>
            
            <button class="action-btn" @click="printPost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="6,9 6,2 18,2 18,9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <polyline points="6,14 6,22 18,22 18,14"></polyline>
              </svg>
              <span>打印</span>
            </button>
          </div>
          
          <!-- 阅读进度 -->
          <div class="reading-progress">
            <div class="progress-label">阅读进度</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${readingProgress}%` }"></div>
            </div>
            <div class="progress-text">{{ Math.round(readingProgress) }}%</div>
          </div>
        </div>
      </aside>

      <!-- 主要内容 -->
      <main class="post-main">
        <article class="post-content">
          <slot />
        </article>
        
        <!-- 文章底部信息 -->
        <footer v-if="frontmatter.lastUpdated" class="post-footer">
          <div class="post-update-info">
            <div class="update-time">
              最后更新：{{ formatDate(frontmatter.lastUpdated) }}
            </div>
          </div>
        </footer>
      </main>

      <!-- 右侧个人信息卡片 -->
      <aside v-if="!isPostListPage" class="post-sidebar-right">
        <div class="sidebar-sticky">
          <!-- 个人信息卡片 -->
          <div class="author-card">
            <div class="author-header">
              <div class="author-avatar">
                 <img src="/images/avatar.jpg" alt="小路" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
                 <div class="avatar-placeholder">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                     <circle cx="12" cy="7" r="4"></circle>
                   </svg>
                 </div>
               </div>
              <div class="author-info">
                <h3 class="author-name">小路</h3>
                <p class="author-title">技术爱好者 | 内容创作者</p>
              </div>
            </div>
            
            <div class="author-description">
              <p>👋 你好！我是小路，一名热爱技术和分享的博主。这里记录我的技术探索、学习心得和生活感悟。</p>
            </div>
            
            <div class="author-social">
               <a href="https://mp.weixin.qq.com/s/rmEHqGeNgRIQ0_Jzqx0jiA" class="social-link-item" title="微信公众号" target="_blank">
                 <svg viewBox="0 0 24 24" fill="currentColor">
                   <path d="M8.5 12.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zm9 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z"/>
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                 </svg>
                 <span>小路成长笔记</span>
               </a>
               
               <a href="https://t.zsxq.com/17wTksRxX" class="social-link-item" title="知识星球" target="_blank">
                 <svg viewBox="0 0 24 24" fill="currentColor">
                   <circle cx="12" cy="12" r="10"/>
                   <path d="M8 12h8M12 8v8"/>
                 </svg>
                 <span>免费星球</span>
               </a>
               
               <div class="social-item" title="微信二维码">
                 <img src="/images/wechat-qrcode.png" alt="微信二维码" class="social-qr" onerror="this.style.display='none'" />
                 <span>微信二维码</span>
               </div>
             </div>
            
            <div class="author-cta">
              <a href="/about/" class="cta-button">
                了解更多
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- 相关文章 -->
          <div v-if="relatedPosts.length" class="related-posts">
            <h3 class="related-title">
              <svg class="related-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              相关文章
            </h3>
            <div class="related-list">
              <article 
                v-for="post in relatedPosts.slice(0, 3)"
                :key="post.url"
                class="related-item"
                @click="navigateToPost(post.url)"
              >
                <div class="related-content">
                  <h4 class="related-post-title">{{ post.title }}</h4>
                  <time class="related-date">{{ formatDate(post.date) }}</time>
                </div>
              </article>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- 文章导航 -->
    <nav v-if="!isPostListPage && (prevPost || nextPost)" class="post-navigation">
      <div class="nav-container">
        <div v-if="prevPost" class="nav-item prev" @click="navigateToPost(prevPost.url)">
          <div class="nav-direction">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span>上一篇</span>
          </div>
          <div class="nav-content">
            <h4 class="nav-title">{{ prevPost.title }}</h4>
            <p class="nav-excerpt">{{ prevPost.description }}</p>
          </div>
        </div>
        
        <div v-if="nextPost" class="nav-item next" @click="navigateToPost(nextPost.url)">
          <div class="nav-content">
            <h4 class="nav-title">{{ nextPost.title }}</h4>
            <p class="nav-excerpt">{{ nextPost.description }}</p>
          </div>
          <div class="nav-direction">
            <span>下一篇</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>

<script setup>
import { useData, useRouter } from 'vitepress'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { data as postsData } from '../composables/posts.data.js'

const { page, frontmatter } = useData()
const router = useRouter()
const posts = postsData

// 检测当前页面类型
const isPostListPage = computed(() => {
  return page.value.relativePath === 'posts/index.md'
})

// 响应式数据
const activeHeading = ref('')
const readingProgress = ref(0)
const isBookmarked = ref(false)

// 计算属性
const headings = computed(() => {
  if (!page.value.headers) return []
  return page.value.headers.map(header => ({
    level: header.level,
    title: header.title,
    anchor: header.anchor
  }))
})

const readingTime = computed(() => {
  if (!page.value.content) return 1
  const wordsPerMinute = 200
  const words = page.value.content.length / 5 // 估算中文字符数
  return Math.ceil(words / wordsPerMinute)
})

const currentPostIndex = computed(() => {
  if (!posts || !Array.isArray(posts)) return -1
  const currentPath = page.value.relativePath.replace(/\.md$/, '').replace(/^posts\//, '')
  return posts.findIndex(post => {
    const postPath = post.url.replace(/^.*\/posts\//, '').replace(/\.html$/, '')
    return postPath === currentPath
  })
})

const prevPost = computed(() => {
  if (currentPostIndex.value <= 0) return null
  return posts[currentPostIndex.value - 1]
})

const nextPost = computed(() => {
  if (currentPostIndex.value < 0 || currentPostIndex.value >= posts.length - 1) return null
  return posts[currentPostIndex.value + 1]
})

const relatedPosts = computed(() => {
  if (!posts || !Array.isArray(posts) || !frontmatter.value.tags) return []
  
  const currentTags = frontmatter.value.tags
  const currentUrl = page.value.relativePath.replace(/\.md$/, '')
  
  return posts
    .filter(post => post.url !== currentUrl && post.tags)
    .map(post => {
      const commonTags = post.tags.filter(tag => currentTags.includes(tag))
      return {
        ...post,
        relevance: commonTags.length
      }
    })
    .filter(post => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
})

const allTags = computed(() => {
  if (!posts || !Array.isArray(posts)) return []
  
  const tagMap = new Map()
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    }
  })
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const maxTagCount = computed(() => {
  return Math.max(...allTags.value.map(tag => tag.count), 1)
})

// 获取当前标签（从URL参数或文章的第一个标签）
const currentTag = computed(() => {
  if (typeof window === 'undefined') return null
  
  // 首先尝试从URL参数获取
  const urlParams = new URLSearchParams(window.location.search)
  const categoryFromUrl = urlParams.get('category')
  if (categoryFromUrl && frontmatter.value.tags && frontmatter.value.tags.includes(categoryFromUrl)) {
    return categoryFromUrl
  }
  
  // 如果没有URL参数或参数无效，使用文章的第一个标签
  if (frontmatter.value.tags && frontmatter.value.tags.length > 0) {
    return frontmatter.value.tags[0]
  }
  
  return null
})

// 方法
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`
  
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const getPlaceholderText = (title) => {
  if (!title) return '📝'
  const firstChar = title.charAt(0)
  return /[\u4e00-\u9fa5]/.test(firstChar) ? firstChar : title.slice(0, 2).toUpperCase()
}

const scrollToHeading = (anchor) => {
  if (typeof window !== 'undefined') {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const updateActiveHeading = () => {
  if (typeof window === 'undefined') return
  
  const headingElements = headings.value.map(heading => 
    document.getElementById(heading.anchor)
  ).filter(Boolean)
  
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element.offsetTop <= scrollTop + 100) {
      activeHeading.value = element.id
      break
    }
  }
}

const updateReadingProgress = () => {
  if (typeof window === 'undefined') return
  
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / docHeight) * 100
  readingProgress.value = Math.min(Math.max(progress, 0), 100)
}

const handleScroll = () => {
  updateActiveHeading()
  updateReadingProgress()
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  // 这里可以添加实际的收藏逻辑
}

const sharePost = () => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({
      title: frontmatter.value.title,
      text: frontmatter.value.description,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    }
  }
}

const printPost = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

const navigateToPost = (url) => {
  if (url) {
    router.go(url)
  }
}

const navigateToTag = (tag) => {
  if (tag) {
    router.go(`/posts/?category=${encodeURIComponent(tag)}`)
  }
}

// 生命周期
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true })
    nextTick(() => {
      updateActiveHeading()
      updateReadingProgress()
    })
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.modern-post-detail {
  min-height: 100vh;
}

/* 文章头部 */
.post-header {
  position: relative;
  height: 50vh;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
  text-align: center;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.breadcrumb-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.breadcrumb-link:hover {
  opacity: 0.8;
}

.breadcrumb-separator {
  opacity: 0.6;
  color: white;
  font-weight: bold;
}

.breadcrumb-current {
  opacity: 0.8;
  color: white;
  font-weight: bold;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.meta-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.8;
}

.post-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.post-tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.post-tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 文章容器 */
.post-container {
  display: grid;
  grid-template-columns: 250px 1fr 280px;
  gap: 1.5rem;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  align-items: start;
}

/* 右侧边栏 */
.post-sidebar-right {
  position: relative;
}

.post-sidebar-right .sidebar-sticky {
  position: sticky;
  top: 2rem;
}

/* 个人信息卡片 */
.author-card {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.author-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  display: none;
  width: 100%;
  height: 100%;
  background: var(--vp-c-brand-soft);
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand);
}

.avatar-placeholder svg {
  width: 24px;
  height: 24px;
}

.author-info {
  flex: 1;
  min-width: 0;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: var(--vp-c-text-1);
}

.author-title {
  font-size: 0.85rem;
  color: var(--vp-c-brand);
  margin: 0;
  font-weight: 500;
}

.author-description {
  margin-bottom: 1.5rem;
}

.author-description p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

.author-social {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.social-item,
.social-link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
}

.social-item:hover,
.social-link-item:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-link-item {
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
}

.social-link-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.social-qr {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--vp-c-divider);
}

.author-cta {
  text-align: center;
}

.author-card .cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.3);
}

.author-card .cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(var(--vp-c-brand-rgb), 0.4);
}

.author-card .cta-button svg {
  width: 14px;
  height: 14px;
}

/* 左侧边栏 */
.post-sidebar {
  position: relative;
}

.sidebar-sticky {
  position: sticky;
  top: 2rem;
}

.toc-container {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.toc-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
}

.toc-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--vp-c-brand);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-link {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.toc-link:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.toc-item.active .toc-link {
  background: var(--vp-c-brand);
  color: white;
  border-left-color: var(--vp-c-brand-dark);
}

.toc-level-3 .toc-link {
  padding-left: 1.5rem;
  font-size: 0.85rem;
}

.toc-level-4 .toc-link {
  padding-left: 2.25rem;
  font-size: 0.8rem;
}

.post-actions {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.action-btn.active {
  background: var(--vp-c-brand);
  color: white;
}

.action-btn svg {
  width: 1.2rem;
  height: 1.2rem;
}

.reading-progress {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.progress-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.progress-bar {
  height: 6px;
  background: var(--vp-c-bg-mute);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

/* 主要内容 */
.post-main {
  min-width: 0;
}

.post-content {
  background: var(--vp-c-bg);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  line-height: 1.8;
  font-size: 1.1rem;
}

.post-footer {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
}

.post-update-info {
  padding-top: 0;
}

.update-time {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* 右侧边栏 */
.post-related {
  position: relative;
}

.related-sticky {
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.related-posts {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.related-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  color: var(--vp-c-text-1);
}

.related-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--vp-c-brand);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.related-item:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider);
}

.related-image {
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.related-content {
  flex: 1;
  min-width: 0;
}

.related-post-title {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0 0 0.25rem;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.tag-cloud {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.tag-cloud-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  color: var(--vp-c-text-1);
}

.tag-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--vp-c-brand);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tag-item:hover {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
  transform: scale(1.05);
}

/* 文章导航 */
.post-navigation {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  padding: 3rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: var(--vp-c-bg);
  border-radius: 1rem;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-item.prev {
  text-align: left;
}

.nav-item.next {
  text-align: right;
  flex-direction: row-reverse;
}

.nav-direction {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand);
  font-weight: 500;
  font-size: 0.9rem;
}

.nav-direction svg {
  width: 1.2rem;
  height: 1.2rem;
}

.nav-content {
  flex: 1;
  min-width: 0;
}

.nav-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.nav-excerpt {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .post-container {
    grid-template-columns: 200px 1fr 250px;
    gap: 2rem;
  }
}

@media (max-width: 1024px) {
  .post-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  
  .post-sidebar {
    order: 2;
  }
  
  .post-main {
    order: 1;
  }
  
  .post-sidebar-right {
    order: 3;
  }
  
  .sidebar-sticky,
  .post-sidebar-right .sidebar-sticky {
    position: static;
    max-height: none;
  }
  
  .author-card {
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
  
  .toc-container,
  .post-actions,
  .reading-progress,
  .related-posts,
  .tag-cloud {
    display: none;
  }
}

@media (max-width: 768px) {
  .post-header {
    height: 50vh;
    min-height: 300px;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    gap: 1rem;
  }
  
  .post-container {
    padding: 2rem 1rem;
  }
  
  .post-content {
    padding: 2rem 1.5rem;
    font-size: 1rem;
  }
  
  .nav-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .nav-item {
    padding: 1.5rem;
  }
  
  .author-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .author-avatar {
    width: 80px;
    height: 80px;
  }
  
  .social-item {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .post-title {
    font-size: 1.5rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-content {
    padding: 1.5rem 1rem;
  }
  
  .breadcrumb {
    flex-wrap: wrap;
  }
  
  .breadcrumb-current {
    max-width: 150px;
  }
}

/* 个人介绍卡片 */
.author-profile {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  padding: 4rem 0;
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  background: var(--vp-c-bg);
  border-radius: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2.5rem 2.5rem 2rem;
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--vp-c-brand-soft);
}

.avatar-placeholder {
  display: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand);
}

.avatar-placeholder svg {
  width: 40px;
  height: 40px;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.profile-title {
  font-size: 0.95rem;
  color: var(--vp-c-brand);
  margin: 0 0 1rem;
  font-weight: 500;
}

.profile-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

.profile-social {
  display: flex;
  gap: 1rem;
  padding: 0 2.5rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.social-link:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

.profile-cta {
  padding: 2rem 2.5rem;
  text-align: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(var(--vp-c-brand-rgb), 0.4);
}

.cta-button svg {
  width: 16px;
  height: 16px;
}

/* 个人介绍响应式 */
@media (max-width: 768px) {
  .author-profile {
    padding: 3rem 0;
  }
  
  .profile-container {
    margin: 0 1rem;
    border-radius: 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem 1.5rem 1.5rem;
  }
  
  .profile-social {
    flex-direction: column;
    padding: 0 1.5rem 1.5rem;
  }
  
  .social-link {
    justify-content: flex-start;
  }
  
  .profile-cta {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .profile-header {
    padding: 1.5rem 1rem 1rem;
  }
  
  .profile-avatar img,
  .avatar-placeholder {
    width: 60px;
    height: 60px;
  }
  
  .avatar-placeholder svg {
    width: 30px;
    height: 30px;
  }
  
  .profile-name {
    font-size: 1.25rem;
  }
  
  .profile-social {
    padding: 0 1rem 1rem;
  }
  
  .profile-cta {
    padding: 1rem;
  }
}

/* 文章列表页面特殊样式 */
.post-container.list-page {
  display: block;
  max-width: none;
  margin: 0;
  padding: 0;
}

.post-container.list-page .post-main {
  max-width: none;
  margin: 0;
  padding: 0;
}

.post-container.list-page .post-content {
  max-width: none;
  margin: 0;
  padding: 0;
}

.post-container.list-page .post-footer {
  display: none;
}

</style>