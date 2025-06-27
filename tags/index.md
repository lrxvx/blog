

<script setup>
import { data as posts } from '../.vitepress/theme/composables/posts.data.js'
import { ref, computed, onMounted, nextTick } from 'vue'

const searchQuery = ref('')

// 提取所有标签并计算每个标签的文章数量
const tags = computed(() => {
    const tagMap = new Map()
    
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, [])
          }
          tagMap.get(tag).push(post)
        })
      }
    })
    
    // 转换为数组并按文章数量排序
    return Array.from(tagMap.entries())
      .map(([name, posts]) => ({
        name,
        count: posts.length,
        posts
      }))
      .sort((a, b) => b.count - a.count)
  })

// 当前选中的标签，默认为'all'显示全部文章
const activeTag = ref('all')

// 根据选中的标签筛选文章
const filteredPosts = computed(() => {
  let result = []
  
  if (activeTag.value === 'all') {
    // 显示所有文章，按时间倒序排列
    result = posts
  } else {
    // 显示特定标签的文章
    const tagObj = tags.value.find(tag => tag.name === activeTag.value)
    if (tagObj && Array.isArray(tagObj.posts)) {
      result = tagObj.posts.filter(post => post && typeof post === 'object' && post.title && post.url)
    }
  }
  
  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) || 
      (post.description && post.description.toLowerCase().includes(query)) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  return result
})

// 设置活动标签
function setActiveTag(tag) {
  activeTag.value = tag
  // 更新URL hash但不刷新页面
  if (tag && tag !== 'all' && tag !== '全部') {
    window.history.replaceState(null, null, `#${tag}`)
  } else {
    window.history.replaceState(null, null, window.location.pathname)
  }
}

// 处理TagBar组件的搜索事件
const handleSearch = (query) => {
  searchQuery.value = query
}

// 处理TagBar组件的标签变化事件
const handleTagChange = (tag) => {
  if (tag === '全部') {
    setActiveTag('all')
  } else {
    setActiveTag(tag)
  }
}

// 清除筛选
const clearFilters = () => {
  searchQuery.value = ''
  setActiveTag('all')
}

// 初始化：从URL hash中获取标签
function initFromHash() {
  const hash = window.location.hash
  if (hash) {
    const tag = decodeURIComponent(hash.slice(1))
    if (tags.value.some(t => t.name === tag)) {
      nextTick(() => {
        setActiveTag(tag)
      })
    }
  } else {
    // 默认显示全部文章
    setActiveTag('all')
  }
}

onMounted(() => {
  initFromHash()
  window.addEventListener('hashchange', initFromHash)
})

</script>

<!-- <div class="page-header">
  <h1>📂 文章标签</h1>
  <p>按标签浏览所有文章</p>
</div> -->

<!-- 标签栏组件 -->
<TagBar @search="handleSearch" @tagChange="handleTagChange" />

<div class="content-wrapper">
  <div v-if="filteredPosts.length === 0" class="no-results">
    <p>没有找到匹配的文章</p>
  </div>

  <div v-else class="posts-list">
    <div v-for="post in filteredPosts" :key="post.url" class="post-item">
      <div class="post-date">{{ post.date }}</div>
      <div class="post-content">
        <h3 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <p v-if="post.description" class="post-description">{{ post.description }}</p>
      </div>
    </div>
  </div>
</div>

<style scoped>
/* 页面容器 */
.VPContent {
  max-width: 1400px !important;
  margin: 0 auto;
  padding: 0 24px;
}

/* 页面头部 */
.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.page-header h1 {
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.page-header p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* 内容区域优化 */
.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}


/* 无结果状态 */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  margin: 2rem 0;
}

.no-results::before {
  content: '🔍';
  display: block;
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* 文章列表 */
.posts-list {
  margin-bottom: 2rem;
}

.post-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
}

.post-date {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  min-width: 80px;
}

.post-content {
  flex: 1;
}

.post-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.post-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 16px;
  }
  
  .post-item {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 0;
  }
  
  .post-date {
    min-width: auto;
    font-size: 0.8rem;
  }
  
  .post-title {
    font-size: 0.95rem;
  }
  
  .post-description {
    font-size: 0.85rem;
  }
  
  .no-results {
    padding: 3rem 1.5rem;
  }
  
  .no-results::before {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .post-item {
    padding: 0.5rem 0;
  }
  
  .post-date {
    font-size: 0.75rem;
  }
  
  .post-title {
    font-size: 0.9rem;
  }
  
  .post-description {
    font-size: 0.8rem;
  }
  
  .no-results {
    padding: 2rem 1rem;
    font-size: 0.9rem;
  }
  
  .no-results::before {
    font-size: 2rem;
  }
}


</style>
