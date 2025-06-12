/**
 * 格式化日期为易读格式
 * @param {string|Date} date - 日期字符串或Date对象
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date) {
  if (!date) return ''
  
  const d = typeof date === 'string' ? new Date(date) : date
  
  // 检查日期是否有效
  if (isNaN(d.getTime())) return ''
  
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * 计算阅读时间
 * @param {string} content - 文章内容
 * @param {number} wordsPerMinute - 每分钟阅读字数
 * @returns {number} 阅读时间（分钟）
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content) return 0
  
  // 移除HTML标签和Markdown语法
  const text = content
    .replace(/\s+/g, ' ')
    .replace(/#+\s/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/\*([^*]*)\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/~~([^~]*)~~/g, '$1')
    .replace(/\|([^|]*)\|/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
  
  // 中文字符计数
  const chineseCharCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // 英文单词计数
  const englishWordCount = text
    .replace(/[\u4e00-\u9fa5]/g, '') // 移除中文字符
    .split(/\s+/)
    .filter(Boolean).length
  
  // 中文阅读速度通常比英文慢，因此给予更高的权重
  const totalWords = englishWordCount + (chineseCharCount * 1.5)
  
  // 计算阅读时间并向上取整
  return Math.ceil(totalWords / wordsPerMinute)
}

/**
 * 生成随机颜色
 * @param {number} seed - 随机种子
 * @returns {string} 十六进制颜色代码
 */
export function generateColor(seed) {
  // 使用简单的伪随机数生成器，基于种子值
  const x = Math.sin(seed) * 10000
  const randomValue = x - Math.floor(x)
  
  // 生成柔和的颜色（避免太亮或太暗）
  const h = Math.floor(randomValue * 360) // 色相
  const s = 60 + Math.floor(randomValue * 20) // 饱和度 60-80%
  const l = 65 + Math.floor(randomValue * 15) // 亮度 65-80%
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

/**
 * 从标签名生成一致的颜色
 * @param {string} tag - 标签名
 * @returns {string} 十六进制颜色代码
 */
export function getTagColor(tag) {
  // 将标签转换为数字（简单的哈希函数）
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return generateColor(hash)
}

/**
 * 截断文本
 * @param {string} text - 要截断的文本
 * @param {number} length - 最大长度
 * @returns {string} 截断后的文本
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text
  return text.slice(0, length) + '...'
}