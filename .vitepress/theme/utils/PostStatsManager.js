/**
 * 文章统计数据管理器
 * 用于管理文章的访问量、阅读量等统计数据
 * 支持本地存储和云端同步
 * 注意：当前功能已被注释禁用
 */

// 存储键名
const STATS_STORAGE_KEY = 'blog_post_stats';
// 上次同步时间键名
const LAST_SYNC_KEY = 'blog_stats_last_sync';
// 同步间隔（毫秒）- 默认 5 分钟
const SYNC_INTERVAL = 5 * 60 * 1000;
// API 端点
const API_ENDPOINTS = {
  getStats: '/api/getStats',
  updateStats: '/api/updateStats'
};

/**
 * 获取所有文章的统计数据
 * @returns {Object} 所有文章的统计数据
 */
export function getAllStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_STORAGE_KEY) || '{}')
  } catch (error) {
    console.error('获取统计数据失败:', error)
    return {}
  }
}

/**
 * 获取指定文章的统计数据
 * @param {string} postId 文章ID
 * @returns {Object} 文章的统计数据
 */
export function getPostStats(postId) {
  if (!postId) return null
  
  const allStats = getAllStats()
  return allStats[postId] || { views: 0, reads: 0, readTime: 0 }
}

/**
 * 更新文章的统计数据
 * @param {string} postId 文章ID
 * @param {string} type 更新类型：'view', 'read', 'readTime'
 * @returns {Object} 更新后的文章统计数据
 */
export function updatePostStats(postId, type) {
  if (!postId) return null
  
  try {
    // 获取所有统计数据
    const allStats = getAllStats()
    
    // 获取当前文章的统计数据
    const postStats = allStats[postId] || { views: 0, reads: 0, readTime: 0 }
    
    // 根据类型更新统计数据
    if (type === 'view') {
      postStats.views += 1
    } else if (type === 'read') {
      postStats.reads += 1
    } else if (type === 'readTime') {
      postStats.readTime += 1
    }
    
    // 保存回localStorage
    allStats[postId] = postStats
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(allStats))
    
    // 尝试同步到云端 - 已禁用
    // trySyncToCloud()
    
    return postStats
  } catch (error) {
    console.error('更新统计数据失败:', error)
    return null
  }
}

/**
 * 清除所有统计数据
 */
export function clearAllStats() {
  try {
    localStorage.removeItem(STATS_STORAGE_KEY)
    localStorage.removeItem(LAST_SYNC_KEY)
    return true
  } catch (error) {
    console.error('清除统计数据失败:', error)
    return false
  }
}

/**
 * 清除指定文章的统计数据
 * @param {string} postId 文章ID
 */
export function clearPostStats(postId) {
  if (!postId) return false
  
  try {
    const allStats = getAllStats()
    if (allStats[postId]) {
      delete allStats[postId]
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(allStats))
    }
    return true
  } catch (error) {
    console.error('清除文章统计数据失败:', error)
    return false
  }
}

/**
 * 导出所有统计数据为JSON字符串
 */
export function exportStatsAsJson() {
  try {
    const allStats = getAllStats()
    return JSON.stringify(allStats, null, 2)
  } catch (error) {
    console.error('导出统计数据失败:', error)
    return '{}'
  }
}

/**
 * 导入统计数据
 * @param {string} jsonData JSON格式的统计数据
 */
export function importStats(jsonData) {
  try {
    const data = JSON.parse(jsonData)
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(data))
    // 导入后立即同步到云端 - 已禁用
    // syncToCloud()
    return true
  } catch (error) {
    console.error('导入统计数据失败:', error)
    return false
  }
}

/**
 * 获取总访问量
 */
export function getTotalViews() {
  const allStats = getAllStats()
  return Object.values(allStats).reduce((total, stats) => total + (stats.views || 0), 0)
}

/**
 * 获取总阅读量
 */
export function getTotalReads() {
  const allStats = getAllStats()
  return Object.values(allStats).reduce((total, stats) => total + (stats.reads || 0), 0)
}

/**
 * 获取总阅读时间（分钟）
 */
export function getTotalReadTime() {
  const allStats = getAllStats()
  return Object.values(allStats).reduce((total, stats) => total + (stats.readTime || 0), 0)
}

/**
 * 获取阅读量最高的N篇文章
 * @param {number} limit 限制数量
 */
export function getTopReadPosts(limit = 5) {
  const allStats = getAllStats()
  
  return Object.entries(allStats)
    .map(([postId, stats]) => ({
      postId,
      ...stats
    }))
    .sort((a, b) => (b.reads || 0) - (a.reads || 0))
    .slice(0, limit)
}

/**
 * 获取访问量最高的N篇文章
 * @param {number} limit 限制数量
 */
export function getTopViewedPosts(limit = 5) {
  const allStats = getAllStats()
  
  return Object.entries(allStats)
    .map(([postId, stats]) => ({
      postId,
      ...stats
    }))
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
}

/**
 * 尝试从云端同步统计数据 - 已禁用
 * 只有在上次同步时间超过同步间隔时才会执行
 */
/*
export async function trySyncFromCloud() {
  try {
    const lastSync = localStorage.getItem(LAST_SYNC_KEY)
    const now = Date.now()
    
    // 如果上次同步时间不存在或者已经超过同步间隔，则执行同步
    if (!lastSync || now - parseInt(lastSync) > SYNC_INTERVAL) {
      await syncFromCloud()
    }
  } catch (error) {
    console.error('尝试从云端同步失败:', error)
  }
}
*/

/**
 * 从云端同步统计数据 - 已禁用
 */
/*
export async function syncFromCloud() {
  try {
    // 获取云端统计数据
    const response = await fetch(API_ENDPOINTS.getStats)
    
    if (!response.ok) {
      throw new Error(`获取云端数据失败: ${response.status} ${response.statusText}`)
    }
    
    const cloudData = await response.json()
    
    // 获取本地统计数据
    const localData = getAllStats()
    
    // 合并云端和本地数据
    const mergedData = { ...localData }
    
    // 遍历云端数据，合并到本地数据
    Object.entries(cloudData).forEach(([postId, cloudStats]) => {
      // 如果本地已有该文章的统计数据，则取两者的最大值
      if (mergedData[postId]) {
        mergedData[postId] = {
          views: Math.max(mergedData[postId].views || 0, cloudStats.views || 0),
          reads: Math.max(mergedData[postId].reads || 0, cloudStats.reads || 0),
          readTime: Math.max(mergedData[postId].readTime || 0, cloudStats.readTime || 0)
        }
      } else {
        // 如果本地没有该文章的统计数据，则直接使用云端数据
        mergedData[postId] = cloudStats
      }
    })
    
    // 保存合并后的数据到本地
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(mergedData))
    
    // 更新同步时间
    localStorage.setItem(LAST_SYNC_KEY, Date.now().toString())
    
    console.log('从云端同步统计数据成功')
    return true
  } catch (error) {
    console.error('从云端同步统计数据失败:', error)
    return false
  }
}
*/

/**
 * 尝试同步统计数据到云端 - 已禁用
 * 只有在上次同步时间超过同步间隔时才会执行
 */
/*
export async function trySyncToCloud() {
  try {
    const lastSync = localStorage.getItem(LAST_SYNC_KEY)
    const now = Date.now()
    
    // 如果上次同步时间不存在或者已经超过同步间隔，则执行同步
    if (!lastSync || now - parseInt(lastSync) > SYNC_INTERVAL) {
      await syncToCloud()
    }
  } catch (error) {
    console.error('尝试同步到云端失败:', error)
  }
}
*/

/**
 * 同步统计数据到云端 - 已禁用
 */
/*
export async function syncToCloud() {
  try {
    // 获取本地统计数据
    const localData = getAllStats()
    
    // 发送到云端
    const response = await fetch(API_ENDPOINTS.updateStats, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(localData)
    })
    
    if (!response.ok) {
      throw new Error(`同步到云端失败: ${response.status} ${response.statusText}`)
    }
    
    // 更新同步时间
    localStorage.setItem(LAST_SYNC_KEY, Date.now().toString())
    
    console.log('同步统计数据到云端成功')
    return true
  } catch (error) {
    console.error('同步统计数据到云端失败:', error)
    return false
  }
}
*/

/**
 * 初始化统计数据管理器 - 已禁用
 * 在应用启动时调用，尝试从云端同步数据
 */
/*
export async function initStatsManager() {
  // 尝试从云端同步数据
  await trySyncFromCloud()
  
  // 设置定期同步
  setInterval(async () => {
    await trySyncToCloud()
  }, SYNC_INTERVAL)
}
*/

// 提供一个空的初始化函数，以便在主题中调用时不会报错
export async function initStatsManager() {
  console.log('统计功能已禁用')
  return true
}