<template>
  <!-- 全局统计功能已禁用 -->
  <!-- 
  <div class="global-stats">
    <div class="stat-item">
      <span class="stat-icon">👁️</span>
      <span class="stat-value">{{ totalViews }}</span>
      <span class="stat-label">总访问量</span>
    </div>
    <div class="stat-item">
      <span class="stat-icon">📖</span>
      <span class="stat-value">{{ totalReads }}</span>
      <span class="stat-label">总阅读量</span>
    </div>
    <div class="stat-item">
      <span class="stat-icon">📊</span>
      <span class="stat-value">{{ postsCount }}</span>
      <span class="stat-label">文章数</span>
    </div>
  </div>
  -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { data as posts } from '../composables/posts.data.js'
// import { getTotalViews, getTotalReads } from '../utils/PostStatsManager'

// 统计数据
const totalViews = ref(0)
const totalReads = ref(0)
const postsCount = ref(0)

// 加载统计数据 - 已禁用
/*
const loadStats = () => {
  if (typeof window === 'undefined') return
  
  totalViews.value = getTotalViews()
  totalReads.value = getTotalReads()
  postsCount.value = posts.length
}

// 组件挂载时加载数据
onMounted(() => {
  loadStats()
  
  // 每分钟刷新一次数据
  const interval = setInterval(() => {
    loadStats()
  }, 60000)
  
  // 组件卸载时清除定时器
  return () => {
    clearInterval(interval)
  }
})
*/

// 仅设置文章数
onMounted(() => {
  postsCount.value = posts.length
})
</script>

<style scoped>
.global-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .global-stats {
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1rem;
    min-width: 100px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}
</style>