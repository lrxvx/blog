<template>
  <!-- 统计数据管理功能已禁用 -->
  <div class="post-stats-admin">
    <h2>文章统计数据管理</h2>
    <p>统计功能当前已禁用。</p>
    <!-- 
    <div class="stats-summary">
      <div class="stat-card">
        <div class="stat-value">{{ totalViews }}</div>
        <div class="stat-label">总访问量</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalReads }}</div>
        <div class="stat-label">总阅读量</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalReadTime }}</div>
        <div class="stat-label">总阅读时间(分钟)</div>
      </div>
    </div>
    
    <div class="stats-actions">
      <button class="action-button" @click="exportStats">导出数据</button>
      <button class="action-button" @click="showImportDialog = true">导入数据</button>
      <button class="action-button danger" @click="confirmClear">清除所有数据</button>
    </div>
    
    <div class="stats-tables">
      <div class="stats-table">
        <h3>访问量最高的文章</h3>
        <table>
          <thead>
            <tr>
              <th>文章</th>
              <th>访问量</th>
              <th>阅读量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in topViewedPosts" :key="post.postId">
              <td>{{ getPostTitle(post.postId) }}</td>
              <td>{{ post.views }}</td>
              <td>{{ post.reads }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="stats-table">
        <h3>阅读量最高的文章</h3>
        <table>
          <thead>
            <tr>
              <th>文章</th>
              <th>阅读量</th>
              <th>访问量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in topReadPosts" :key="post.postId">
              <td>{{ getPostTitle(post.postId) }}</td>
              <td>{{ post.reads }}</td>
              <td>{{ post.views }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 导入数据对话框 -->
    <div class="import-dialog" v-if="showImportDialog">
      <div class="import-dialog-content">
        <h3>导入统计数据</h3>
        <p>请粘贴之前导出的JSON数据：</p>
        <textarea v-model="importData" rows="10" placeholder="粘贴JSON数据..."></textarea>
        <div class="dialog-actions">
          <button @click="importStats">导入</button>
          <button @click="showImportDialog = false">取消</button>
        </div>
      </div>
    </div>
    
    <!-- 确认清除对话框 -->
    <div class="confirm-dialog" v-if="showClearConfirm">
      <div class="confirm-dialog-content">
        <h3>确认清除</h3>
        <p>确定要清除所有统计数据吗？此操作不可恢复！</p>
        <div class="dialog-actions">
          <button class="danger" @click="clearAllStats">确认清除</button>
          <button @click="showClearConfirm = false">取消</button>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { data as posts } from '../composables/posts.data.js'
/*
import {
  getTotalViews,
  getTotalReads,
  getTotalReadTime,
  getTopViewedPosts,
  getTopReadPosts,
  exportStatsAsJson,
  importStats,
  clearAllStats
} from '../utils/PostStatsManager'

// 统计数据
const totalViews = ref(0)
const totalReads = ref(0)
const totalReadTime = ref(0)
const topViewedPosts = ref([])
const topReadPosts = ref([])

// 对话框状态
const showImportDialog = ref(false)
const showClearConfirm = ref(false)
const importData = ref('')

// 加载统计数据
const loadStats = () => {
  if (typeof window === 'undefined') return
  
  totalViews.value = getTotalViews()
  totalReads.value = getTotalReads()
  totalReadTime.value = getTotalReadTime()
  topViewedPosts.value = getTopViewedPosts(5)
  topReadPosts.value = getTopReadPosts(5)
}

// 获取文章标题
const getPostTitle = (postId) => {
  // 从posts.data.js中查找文章
  const post = posts.find(p => p.url === postId || p.url === postId.replace(/\.md$/, '.html'))
  if (post) return post.title
  
  // 如果找不到，返回文件名
  const parts = postId.split('/')
  return parts[parts.length - 1].replace(/\.md$/, '')
}

// 导出统计数据
const exportStats = () => {
  const jsonData = exportStatsAsJson()
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `blog_stats_${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 导入统计数据
const importStatsData = () => {
  if (!importData.value.trim()) {
    alert('请输入有效的JSON数据')
    return
  }
  
  try {
    const success = importStats(importData.value)
    if (success) {
      alert('数据导入成功')
      showImportDialog.value = false
      importData.value = ''
      loadStats()
    } else {
      alert('数据导入失败')
    }
  } catch (error) {
    alert(`导入失败: ${error.message}`)
  }
}

// 确认清除对话框
const confirmClear = () => {
  showClearConfirm.value = true
}

// 清除所有统计数据
const clearAllStatsData = () => {
  const success = clearAllStats()
  if (success) {
    alert('所有统计数据已清除')
    showClearConfirm.value = false
    loadStats()
  } else {
    alert('清除数据失败')
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadStats()
})
*/
</script>

<style scoped>
.post-stats-admin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.stats-summary {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  flex: 1;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.stats-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.action-button.danger {
  background-color: #e53935;
}

.action-button.danger:hover {
  background-color: #c62828;
}

.stats-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.stats-table h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

th {
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

tr:hover {
  background-color: var(--vp-c-bg-soft);
}

/* 对话框样式 */
.import-dialog,
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.import-dialog-content,
.confirm-dialog-content {
  background-color: var(--vp-c-bg);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  margin: 1rem 0;
  font-family: monospace;
  resize: vertical;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-summary {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stats-tables {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>