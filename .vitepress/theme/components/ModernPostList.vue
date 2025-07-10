<template>
  <div class="modern-blog-container">

    <!-- 搜索和筛选区域 -->
    <section class="filter-section">
      <div class="search-container">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索文章标题、内容或标签..."
            class="search-input"
          />
          <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 分类标签 -->
      <div class="category-container">
        <div class="category-scroll">
          <button 
            v-for="category in categories" 
            :key="category.name"
            :class="['category-tag', { active: selectedCategory === category.name }]"
            @click="setCategory(category.name)"
          >
            {{ category.name }}
            <span class="category-count">{{ category.count }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 文章统计 -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-number">{{ filteredPosts.length }}</span>
        <span class="stat-label">篇文章</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ categories.length - 1 }}</span>
        <span class="stat-label">个分类</span>
      </div>

    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 文章列表 -->
      <main class="posts-container">
        <div v-if="paginatedPosts.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <h3>没有找到相关文章</h3>
          <p>尝试调整搜索关键词或选择其他分类</p>
          <button @click="clearFilters" class="clear-filters-btn">清除筛选条件</button>
        </div>
        
        <div v-else :class="['posts-grid', viewMode]">
          <article 
            v-for="post in paginatedPosts" 
            :key="post.url"
            class="post-card"
            @click="navigateToPost(post.url)"
          >
            <div class="post-image">
              <div v-if="post.cover" class="cover-image">
                <img :src="post.cover" :alt="post.title" loading="lazy" />
              </div>
              <div v-else class="placeholder-image">
                <span class="placeholder-text">{{ getPlaceholderText(post.title) }}</span>
              </div>

            </div>
            
            <div class="post-content">
              <div class="post-header">
                <h2 class="post-title">{{ post.title }}</h2>
                <time class="post-date">{{ formatDate(post.date) }}</time>
              </div>
              
              <p class="post-excerpt">{{ post.description || post.excerpt || '点击阅读全文...' }}</p>
              
              <div class="post-footer">
                <div class="post-tags">
                  <span 
                    v-for="tag in (post.tags || []).slice(0, 3)"
                    :key="tag"
                    class="post-tag"
                    @click.stop="setCategory(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
                <div class="read-more">
                  <span>阅读更多</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <!-- 右侧个人信息卡片 -->
      <aside class="sidebar">
        <div class="sidebar-sticky">
          <!-- 个人信息卡片 -->
          <div class="author-card">
            <div class="author-header">
              <div class="author-avatar">
                <img src="/images/avatar.jpg" alt="小路" />
              </div>
              <div class="author-info">
                <h3 class="author-name">小路</h3>
                <p class="author-title">技术爱好者 | 内容创作者</p>
              </div>
            </div>
            
            <div class="author-description">
              <p>热爱技术，喜欢分享。专注于前端开发、技术写作和个人成长。希望通过文字记录学习过程，与大家一起进步。</p>
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
        </div>
      </aside>
    </div>

    <!-- 分页 -->
    <nav v-if="totalPages > 1" class="pagination">
      <button 
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="pagination-btn prev"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        上一页
      </button>
      
      <div class="pagination-numbers">
        <button 
          v-for="page in visiblePages"
          :key="page"
          :class="['pagination-number', { active: page === currentPage }]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="pagination-btn next"
      >
        下一页
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { data as postsData } from '../composables/posts.data.js'

const posts = postsData
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const viewMode = ref('list')
const pageSize = 12

// 分类统计
const categories = computed(() => {
  if (!posts || !Array.isArray(posts)) return []
  
  const categoryMap = new Map()
  categoryMap.set('全部', posts.length)
  
  posts.forEach(post => {
    if (post && post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag && typeof tag === 'string') {
          categoryMap.set(tag, (categoryMap.get(tag) || 0) + 1)
        }
      })
    }
  })
  
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .filter(category => category.name && category.count > 0)
    .sort((a, b) => {
      if (a.name === '全部') return -1
      if (b.name === '全部') return 1
      return b.count - a.count
    })
})

// 筛选后的文章
const filteredPosts = computed(() => {
  if (!posts || !Array.isArray(posts)) return []
  
  let result = posts
  
  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(post => 
      post && post.tags && post.tags.includes(selectedCategory.value)
    )
  }
  
  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post && (
        (post.title && post.title.toLowerCase().includes(query)) || 
        (post.description && post.description.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    )
  }
  
  return result.sort((a, b) => {
    const dateA = a && a.date ? new Date(a.date) : new Date(0)
    const dateB = b && b.date ? new Date(b.date) : new Date(0)
    return dateB - dateA
  })
})

// 分页后的文章
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPosts.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / pageSize)
})

// 可见页码
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages
})

// 格式化日期
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
  if (days < 365) return `${Math.floor(days / 30)}个月前`
  
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 获取占位符文本
const getPlaceholderText = (title) => {
  if (!title) return '📝'
  const firstChar = title.charAt(0)
  return /[\u4e00-\u9fa5]/.test(firstChar) ? firstChar : title.slice(0, 2).toUpperCase()
}

// 设置分类
const setCategory = (category) => {
  if (category) {
    selectedCategory.value = category
    currentPage.value = 1
  }
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

// 清除所有筛选条件
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = '全部'
  currentPage.value = 1
}

// 跳转到页面
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // 滚动到顶部
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

// 导航到文章
const navigateToPost = (url) => {
  if (url) {
    router.go(url)
  }
}

// 监听搜索变化
const handleSearchChange = () => {
  currentPage.value = 1
}

// 响应式处理
onMounted(() => {
  // 从URL参数中获取初始分类
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get('category')
    if (category) {
      selectedCategory.value = category
    }
  }
})
</script>

<style scoped>
.modern-blog-container {
  margin: 0 auto;
  padding: 0;
  width: 100%;
}



/* 筛选区域 */
.filter-section {
  margin-bottom: 2rem;
}

.search-container {
  margin-bottom: 1.5rem;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.2rem;
  height: 1.2rem;
  color: var(--vp-c-text-2);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 2rem;
  background: var(--vp-c-bg-soft);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--vp-c-text-2);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: var(--vp-c-text-1);
}

.clear-btn svg {
  width: 1rem;
  height: 1rem;
  color: white;
}

.category-container {
  overflow-x: auto;
  padding: 0.5rem 0;
}

.category-scroll {
  display: flex;
  gap: 0.75rem;
  min-width: max-content;
  padding: 0 0.5rem;
}

.category-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 1.5rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.category-tag:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.category-tag.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.category-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.category-tag.active .category-count {
  background: rgba(255, 255, 255, 0.3);
}

/* 统计栏 */
.stats-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.stat-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}



/* 文章列表 */
.posts-container {
  margin-bottom: 3rem;
}

.posts-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.posts-grid.grid {
  grid-template-columns: 1fr;
}

.posts-grid.list {
  grid-template-columns: 1fr;
}

.post-card {
  background: var(--vp-c-bg-soft);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0;
  height: 100px;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}



.post-image {
  position: relative;
  height: 100px;
  overflow: hidden;
}

.cover-image,
.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.post-card:hover .cover-image img {
  transform: scale(1.1);
}

.placeholder-image {
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  color: white;
}

.placeholder-text {
  font-size: 2rem;
  font-weight: 700;
}



.post-content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.post-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.post-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin: 0 0 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.85rem;
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background: var(--vp-c-brand-dark);
  transform: scale(1.05);
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand);
  font-weight: 500;
  font-size: 0.9rem;
}

.read-more svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.post-card:hover .read-more svg {
  transform: translateX(3px);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  opacity: 0.5;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}

.empty-state p {
  margin: 0 0 1.5rem;
}

.clear-filters-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 1rem;
  height: 1rem;
}

.pagination-numbers {
  display: flex;
  gap: 0.25rem;
}

.pagination-number {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.pagination-number.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-blog-container {
    padding: 0 0.5rem;
  }
  

  
  .posts-grid.grid {
    grid-template-columns: 1fr;
  }
  
  .post-card {
    grid-template-columns: 1fr !important;
    height: auto !important;
  }
  
  .post-image {
    height: 200px !important;
  }
  
  .stats-bar {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .stat-divider {
    width: 100%;
    height: 1px;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  .pagination-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .category-scroll {
    padding: 0;
  }
  
  .category-tag {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .post-content {
    padding: 1rem;
  }
  
  .posts-grid.list .post-content {
    padding: 1rem;
  }
}

/* 主要内容区域布局 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
  margin: 0 auto;
  padding: 0 2rem;
  align-items: start;
}

/* 右侧边栏 */
.sidebar {
  position: relative;
}

.sidebar-sticky {
  position: sticky;
  top: 2rem;
}

/* 个人信息卡片 */
.author-card {
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.social-item:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.social-link-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.social-link-item:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
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

.cta-button {
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

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(var(--vp-c-brand-rgb), 0.4);
}

.cta-button svg {
  width: 14px;
  height: 14px;
}

/* 响应式设计 - 个人信息卡片 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .sidebar {
    order: -1;
  }
  
  .sidebar-sticky {
    position: static;
  }
  
  .author-card {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
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
</style>