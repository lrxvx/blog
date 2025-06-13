<template>
  <!-- 文章统计功能已禁用 -->
  <!-- 
  <div class="post-stats" v-if="isPostPage">
    <div class="stat-item">
      <span class="stat-icon">👁️</span>
      <span class="stat-value">{{ viewCount }}</span>
      <span class="stat-label">浏览</span>
    </div>
    <div class="stat-item">
      <span class="stat-icon">📖</span>
      <span class="stat-value">{{ readCount }}</span>
      <span class="stat-label">阅读</span>
    </div>
  </div>
  -->
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useData } from 'vitepress'
// import { getPostStats, updatePostStats } from '../utils/PostStatsManager'

const { page, frontmatter } = useData()

// 获取当前文章的URL路径
const currentPath = computed(() => page.value.relativePath)

// 检查当前页面是否为文章页面
const isPostPage = computed(() => {
  return currentPath.value.startsWith('posts/') && currentPath.value !== 'posts/index.md'
})

// 文章标识符
const postId = computed(() => {
  if (!isPostPage.value) return ''
  return currentPath.value
})

// 统计数据
const viewCount = ref(0)
const readCount = ref(0)
const readPercentage = ref(0)
const readTime = ref(0)

// 从PostStatsManager获取统计数据 - 已禁用
/*
const getStats = () => {
  if (!isPostPage.value || !postId.value) return
  
  const postStats = getPostStats(postId.value)
  if (postStats) {
    viewCount.value = postStats.views || 0
    readCount.value = postStats.reads || 0
    readTime.value = postStats.readTime || 0
  }
}
*/

// 更新统计数据 - 已禁用
/*
const updateStats = (type) => {
  if (!isPostPage.value || !postId.value) return
  
  const postStats = updatePostStats(postId.value, type)
  if (postStats) {
    viewCount.value = postStats.views || 0
    readCount.value = postStats.reads || 0
    readTime.value = postStats.readTime || 0
  }
}
*/

// 监听滚动事件，计算阅读进度 - 已禁用
/*
const handleScroll = () => {
  if (!isPostPage.value) return
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  
  // 计算阅读百分比
  const percentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
  readPercentage.value = Math.min(Math.max(percentage, 0), 100)
  
  // 如果阅读进度超过70%，认为已阅读
  if (readPercentage.value >= 70 && readCount.value === 0) {
    updateStats('read')
  }
}
*/

// 定时更新阅读时间的定时器
let readTimeInterval = null

// 组件挂载时 - 已禁用统计功能
/*
onMounted(() => {
  if (!isPostPage.value) return
  
  // 客户端环境检查
  if (typeof window === 'undefined') return
  
  // 获取统计数据
  getStats()
  
  // 增加浏览量
  updateStats('view')
  
  // 监听滚动事件
  window.addEventListener('scroll', handleScroll)
  
  // 定时更新阅读时间
  readTimeInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      updateStats('readTime')
    }
  }, 60000) // 每分钟更新一次
})
*/

// 组件卸载时清除事件监听和定时器 - 已禁用
/*
onUnmounted(() => {
  if (typeof window === 'undefined') return
  
  window.removeEventListener('scroll', handleScroll)
  if (readTimeInterval) {
    clearInterval(readTimeInterval)
  }
})
*/
</script>

<style scoped>
.post-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-icon {
  opacity: 0.7;
}

.stat-value {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stat-label {
  margin-left: 0.25rem;
}
</style>