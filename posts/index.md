
<script setup>
import { data as posts } from '../.vitepress/theme/composables/posts.data.js'
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedTag = ref('')

const allTags = computed(() => {
  const tags = new Set()
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

const filteredPosts = computed(() => {
  let result = posts
  
  // 按标签筛选
  if (selectedTag.value) {
    result = result.filter(post => 
      post.tags && post.tags.includes(selectedTag.value)
    )
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

const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
}
</script>

<div class="blog-header">
  <h1 class="blog-title">📝 博客文章</h1>
  <p class="blog-subtitle">分享技术与生活的点滴思考</p>
</div>

<div class="blog-stats">
  <div class="stat-item">
    <span class="stat-number">{{ posts.length }}</span>
    <span class="stat-label">篇文章</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">{{ allTags.length }}</span>
    <span class="stat-label">个标签</span>
  </div>
  <div class="stat-item">
    <span class="stat-number">{{ filteredPosts.length }}</span>
    <span class="stat-label">筛选结果</span>
  </div>
</div>

<div class="filter-section">
  <div class="search-container">
    <div class="search-box">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="搜索文章标题、描述或标签..." 
        class="search-input"
      />
    </div>
  </div>
  
  <div class="tag-filter">
    <button 
      @click="selectedTag = ''"
      :class="['tag-btn', { active: !selectedTag }]"
    >
      全部
    </button>
    <button 
      v-for="tag in allTags" 
      :key="tag"
      @click="selectedTag = selectedTag === tag ? '' : tag"
      :class="['tag-btn', { active: selectedTag === tag }]"
    >
      {{ tag }}
    </button>
  </div>
  
  <div v-if="searchQuery || selectedTag" class="filter-actions">
    <button @click="clearFilters" class="clear-btn">
      清除筛选
    </button>
  </div>
</div>

<div v-if="filteredPosts.length === 0" class="no-results">
  <div class="no-results-icon">🔍</div>
  <h3>没有找到匹配的文章</h3>
  <p>尝试调整搜索条件或清除筛选</p>
  <button @click="clearFilters" class="clear-btn">清除筛选</button>
</div>

<div v-else class="posts-grid">
  <article v-for="post in filteredPosts" :key="post.url" class="post-card">
    <div class="post-card-header">
      <div v-if="post.cover" class="post-cover">
        <img :src="post.cover" :alt="post.title" />
      </div>
      <div v-else class="post-cover-placeholder">
        <span class="cover-icon">📄</span>
      </div>
    </div>
    <div class="post-card-content">
      <div class="post-meta">
        <time class="post-date">{{ post.date }}</time>
        <span v-if="post.author" class="post-author">{{ post.author }}</span>
      </div>
      <h2 class="post-title">
        <a v-bind:href="post.url">{{ post.title }}</a>
      </h2>
      <p v-if="post.description" class="post-description">
        {{ post.description }}
      </p>
      <div v-if="post.tags && post.tags.length" class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="post-tag">
          <a v-bind:href="`/tags/#${tag}`" @click.stop>{{ tag }}</a>
        </span>
      </div>
      <div class="post-actions">
        <!-- 确保标签正确闭合 -->
        <a :href="post.url" class="read-more-btn">
          阅读全文
          <span class="arrow-icon">&rarr;</span> <!-- 使用 HTML 实体 -->
        </a> <!-- 关闭标签必须存在 -->
      </div>
    </div>
  </article>
</div>
  <!-- </div> -->
<!-- </div> -->

<style scoped>
/* 博客头部 */
.blog-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-brand-softer) 100%);
  border-radius: 16px;
  margin-top: 2rem;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 统计信息 */
.blog-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider-light);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

/* 筛选区域 */
.filter-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider-light);
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
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 25px;
  font-size: 1rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.tag-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tag-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.tag-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.filter-actions {
  text-align: center;
}

.clear-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: var(--vp-c-danger-1);
  color: white;
  transform: translateY(-1px);
}

/* 无结果状态 */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.no-results p {
  margin-bottom: 2rem;
}

/* 文章网格 */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* 文章卡片 */
.post-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-soft);
}

.post-card-header {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-cover {
  width: 100%;
  height: 100%;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-cover img {
  transform: scale(1.05);
}

.post-cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-brand-softer));
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-icon {
  font-size: 3rem;
  opacity: 0.6;
}

.post-card-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1rem;
}

.post-date {
  font-weight: 500;
}

.post-author {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.post-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.post-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.post-tag a {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 12px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.post-tag a:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-1px);
}

.post-actions {
  display: flex;
  justify-content: flex-end;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.arrow-icon {
   font-size: 1rem;
   transition: transform 0.3s ease;
   display: inline-block;
 }
 
 .read-more-btn:hover .arrow-icon {
   transform: translateX(2px);
 }

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }
  
  .blog-stats {
    gap: 1rem;
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .tag-filter {
    justify-content: flex-start;
  }
  
  .filter-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .blog-header {
    padding: 1.5rem 1rem;
    margin-top: 1rem;
  }
  
  .blog-title {
    font-size: 1.75rem;
  }
  
  .blog-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .post-card-content {
    padding: 1rem;
  }
}
</style>