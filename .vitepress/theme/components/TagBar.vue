<template>
  <div class="tag-bar-container" v-if="showTagBar">
    <div class="tag-bar-content">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索文章标题、内容或标签..."
            class="search-input"
            @input="handleSearch"
          />
          <button 
            v-if="searchQuery" 
            @click="clearSearch" 
            class="clear-btn"
            title="清除搜索"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 标签区域 -->
      <div class="tags-section">
        <div class="tags-header">
          <span class="tags-title">标签筛选</span>
          <button 
            v-if="activeTag !== '全部'" 
            @click="resetFilter" 
            class="reset-btn"
          >
            重置筛选
          </button>
        </div>
        
        <div class="tag-bar">
          <!-- 主要标签 -->
          <div 
            v-for="tag in mainTags" 
            :key="tag.name"
            class="tag-item"
          >
            <button 
              :class="['tag-btn', { active: isTagActive(tag.name), 'has-dropdown': tag.children && tag.children.length > 0 }]"
              @click="handleTagClick(tag)"
            >
              <span class="tag-icon">{{ tag.icon }}</span>
              {{ tag.displayName }} ({{ tag.count }})
              <span v-if="tag.children && tag.children.length > 0" class="dropdown-arrow" :class="{ rotated: showDropdown === tag.name }">▼</span>
            </button>
            
            <!-- 多级标签下拉菜单 -->
            <div 
              v-if="tag.children && tag.children.length > 0" 
              :class="['dropdown-menu', { show: showDropdown === tag.name }]"
            >
              <div class="dropdown-header">{{ tag.displayName }} 子标签</div>
              <button 
                v-for="child in tag.children"
                :key="child.name"
                :class="['dropdown-item', { active: activeTag === child.name }]"
                @click.stop="setActiveTag(child.name)"
              >
                <span class="child-icon">{{ child.icon || '🏷️' }}</span>
                {{ child.displayName }} ({{ child.count }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData, useRouter } from 'vitepress'

const { site } = useData()
const router = useRouter()

// 响应式数据
const activeTag = ref('全部')
const showTagBar = ref(true)
const searchQuery = ref('')
const showDropdown = ref('')

// 定义事件
const emits = defineEmits(['search', 'tagChange'])

// 从props接收文章数据
const props = defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

// 定义标签层次结构和图标
const tagHierarchy = {
  '副业': {
    icon: '💼',
    children: ['副业100问', '副业思考', '副业实践', '公众号']
  },
  '写作': {
    icon: '✍️',
    children: ['写作100问', '写作技巧', '写作心得']
  },
  '技术': {
    icon: '💻',
    children: ['VitePress', '博客', 'AI编程', '前端开发', '后端开发']
  },
  '教程': {
    icon: '📚',
    children: ['基础教程', '进阶教程', '实战教程']
  },
  '日记': {
    icon: '📝',
    children: ['一人企业日记', '技术日记', '生活日记']
  },
  '工具': {
    icon: '🔧',
    children: ['开发工具', '效率工具', '设计工具']
  },
  '思考': {
    icon: '💭',
    children: ['技术思考', '产品思考', '人生思考']
  }
}

// 子标签图标映射
const childTagIcons = {
  '副业100问': '❓',
  '副业思考': '💡',
  '副业实践': '🎯',
  '公众号': '📢',
  '写作100问': '❓',
  '写作技巧': '✨',
  '写作心得': '💭',
  'VitePress': '⚡',
  '博客': '📖',
  'AI编程': '🤖',
  '前端开发': '🎨',
  '后端开发': '⚙️',
  '一人企业日记': '👤',
  '技术日记': '💻',
  '生活日记': '🌱',
  '基础教程': '📝',
  '进阶教程': '🚀',
  '实战教程': '⚔️',
  '开发工具': '🛠️',
  '效率工具': '⚡',
  '设计工具': '🎨',
  '技术思考': '🤔',
  '产品思考': '💼',
  '人生思考': '🌟'
}

// 计算总文章数
const totalCount = computed(() => props.posts.length)

// 获取所有标签统计
const allTagStats = computed(() => {
  const tagMap = new Map()
  
  props.posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        // 处理多级标签格式 (如: "副业/副业100问")
        if (tag.includes('/')) {
          const parts = tag.split('/')
          const parentName = parts[0]
          const childName = parts[1]
          
          if (parentName && childName) {
            // 统计子级标签
            tagMap.set(childName, (tagMap.get(childName) || 0) + 1)
            // 统计父级标签（用于计算父级总数）
            tagMap.set(parentName, (tagMap.get(parentName) || 0) + 1)
            // 统计完整的标签路径
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
          }
        } else {
          // 普通标签
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        }
      })
    }
  })
  
  return tagMap
})

// 构建主要标签（父级标签）
const mainTags = computed(() => {
  const tags = []
  const parentChildMap = new Map()
  
  // 如果没有文章数据，返回空数组
  if (!props.posts || props.posts.length === 0) {
    return tags
  }
  
  // 首先添加"全部"标签
  tags.push({
    name: '全部',
    displayName: '全部',
    count: props.posts.length,
    icon: '📂',
    children: []
  })
  
  // 遍历所有文章的标签
  props.posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag.includes('/')) {
          const parts = tag.split('/')
          const parentName = parts[0]
          const childName = parts[1]
          
          if (parentName && childName) {
            if (!parentChildMap.has(parentName)) {
              parentChildMap.set(parentName, new Set())
            }
            parentChildMap.get(parentName).add(childName)
          }
        } else {
          // 独立标签
          if (!parentChildMap.has(tag)) {
            parentChildMap.set(tag, null)
          }
        }
      })
    }
  })
  
  // 构建父级标签
  parentChildMap.forEach((childrenSet, parentName) => {
    if (childrenSet && childrenSet.size > 0) {
      // 有子标签的父级标签
      const children = Array.from(childrenSet)
        .map(childName => ({
          name: childName,
          displayName: childName,
          count: allTagStats.value.get(childName) || 0,
          icon: childTagIcons[childName] || '🏷️'
        }))
        .filter(child => child.count > 0)
        .sort((a, b) => b.count - a.count)
      
      // 父级标签的计数使用统计数据
      const parentCount = allTagStats.value.get(parentName) || 0
      
      if (parentCount > 0) {
        tags.push({
          name: parentName,
          displayName: parentName,
          count: parentCount,
          icon: tagHierarchy[parentName]?.icon || '📁',
          children: children
        })
      }
    } else {
      // 独立标签（没有子标签）
      const count = allTagStats.value.get(parentName) || 0
      if (count > 0) {
        tags.push({
          name: parentName,
          displayName: parentName,
          count: count,
          icon: '🏷️',
          children: []
        })
      }
    }
  })
  
  // 排序："全部"标签始终在第一位，其他标签按文章数量排序
  return tags.sort((a, b) => {
    if (a.name === '全部') return -1
    if (b.name === '全部') return 1
    return b.count - a.count
  })
})

// 检查标签是否激活（包括子标签）
const isTagActive = (tagName) => {
  if (activeTag.value === tagName) return true
  
  // 检查是否是当前激活标签的父标签
  const tag = mainTags.value.find(t => t.name === tagName)
  if (tag && tag.children) {
    return tag.children.some(child => child.name === activeTag.value)
  }
  
  return false
}

// 处理标签点击事件
const handleTagClick = (tag) => {
  // 如果有子标签，切换下拉菜单显示状态
  if (tag.children && tag.children.length > 0) {
    if (showDropdown.value === tag.name) {
      showDropdown.value = ''
    } else {
      showDropdown.value = tag.name
    }
  } else {
    // 如果没有子标签，直接设置为活跃标签
    setActiveTag(tag.name)
  }
}

// 设置活跃标签
const setActiveTag = (tagName) => {
  activeTag.value = tagName
  showDropdown.value = ''
  
  // 触发标签变化事件
  emits('tagChange', tagName)
  
  // 检查当前是否在文章页面，如果是则跳转到标签页面
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname
    const isPostPage = currentPath.startsWith('/posts/') && !currentPath.endsWith('/posts/')
    
    if (isPostPage) {
      // 在文章页面时，跳转到标签页面
      if (tagName === '全部') {
        router.go('/tags/')
      } else {
        router.go(`/tags/#${encodeURIComponent(tagName)}`)
      }
    } else {
      // 在标签页面时，只更新URL hash
      if (tagName === '全部') {
        window.history.replaceState(null, null, '/tags/')
      } else {
        window.history.replaceState(null, null, `/tags/#${encodeURIComponent(tagName)}`)
      }
    }
  }
}

// 重置筛选
const resetFilter = () => {
  setActiveTag('全部')
  searchQuery.value = ''
  emits('search', '')
}

// 处理搜索
const handleSearch = () => {
  emits('search', searchQuery.value)
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
  emits('search', '')
}

// 下拉菜单显示控制
let hideDropdownTimer = null

const handleMouseEnter = (tagName) => {
  if (hideDropdownTimer) {
    clearTimeout(hideDropdownTimer)
    hideDropdownTimer = null
  }
  showDropdown.value = tagName
}

const handleMouseLeave = () => {
  if (hideDropdownTimer) {
    clearTimeout(hideDropdownTimer)
  }
  hideDropdownTimer = setTimeout(() => {
    showDropdown.value = ''
  }, 200)
}

// 隐藏下拉菜单
const hideDropdown = () => {
  if (hideDropdownTimer) {
    clearTimeout(hideDropdownTimer)
  }
  hideDropdownTimer = setTimeout(() => {
    showDropdown.value = ''
  }, 300)
}

// 取消隐藏下拉菜单
const cancelHideDropdown = () => {
  if (hideDropdownTimer) {
    clearTimeout(hideDropdownTimer)
    hideDropdownTimer = null
  }
}

// 从URL hash获取当前标签
const initFromHash = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.slice(1)
    if (hash) {
      activeTag.value = decodeURIComponent(hash)
    } else {
      activeTag.value = '全部'
    }
  }
}

// 点击外部区域关闭下拉菜单
const handleClickOutside = (event) => {
  const tagBar = event.target.closest('.tag-bar-container')
  if (!tagBar) {
    showDropdown.value = ''
  }
}

onMounted(() => {
  initFromHash()
  
  // 监听hash变化
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', initFromHash)
    document.addEventListener('click', handleClickOutside)
  }
})

// 清理事件监听器
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
/* 为页面内容添加顶部间距，避免被固定标签栏遮挡 */
:global(.VPContent) {
  padding-top: 20px;
}

.tag-bar-container {
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 1.5rem 0;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.tag-bar-content {
  max-width: none;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 搜索区域样式 */
.search-section {
  display: flex;
  justify-content: center;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.clear-btn svg {
  width: 14px;
  height: 14px;
}

/* 标签区域样式 */
.tags-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tags-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reset-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tag-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-start;
}

/* 标签项容器 */
.tag-item {
  position: relative;
  display: inline-block;
}

/* 标签按钮样式 */
.tag-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.tag-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tag-btn.active {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  border-color: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(var(--vp-c-brand-rgb), 0.3);
}

.tag-all {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-mute) 100%);
  border-color: var(--vp-c-brand-1);
}

.tag-all.active {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
}

.tag-item {
  position: relative;
}

.tag-icon {
  font-size: 1rem;
  line-height: 1;
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  margin-left: 0.25rem;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.tag-btn.has-dropdown {
  position: relative;
}

.tag-btn.has-dropdown:hover {
  cursor: pointer;
}

/* 下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px) scale(0.95);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  pointer-events: none;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.dropdown-header {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.dropdown-item.active {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: white;
}

.child-icon {
  font-size: 0.9rem;
  line-height: 1;
}

/* 响应式设计 */
@media (min-width: 640px) {
  .tag-bar-content {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .tag-bar-content {
    padding: 0 64px;
  }
}

@media (max-width: 768px) {
  :global(.VPContent) {
    padding-top: 20px;
  }
  
  .tag-bar-container {
    padding: 1rem 0;
  }
  
  .tag-bar-content {
    gap: 1rem;
  }
  
  .search-input-wrapper {
    max-width: 100%;
  }
  
  .tags-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .tag-bar {
    gap: 0.5rem;
  }
  
  .tag-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .dropdown-menu {
    left: 50%;
    transform: translateX(-50%) translateY(-8px) scale(0.95);
    min-width: 180px;
  }
  
  .dropdown-menu.show {
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .tag-bar {
    gap: 0.4rem;
  }
  
  .tag-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
  
  .tag-icon {
    font-size: 0.9rem;
  }
}
</style>