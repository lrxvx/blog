// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import PostList from './components/PostList.vue'
import PostMeta from './components/PostMeta.vue'
import ProfileCard from './components/ProfileCard.vue'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import PostNavigation from './components/PostNavigation.vue'
import PostStats from './components/PostStats.vue'
import PostStatsAdmin from './components/PostStatsAdmin.vue'
import GlobalStats from './components/GlobalStats.vue'
import TagBar from './components/TagBar.vue'
import ModernPostList from './components/ModernPostList.vue'
import ModernPostDetail from './components/ModernPostDetail.vue'
import PostListPage from './layouts/PostListPage.vue'
import Layout from './Layout.vue'
import { initStatsManager } from './utils/PostStatsManager.js'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('PostList', PostList)
    app.component('PostMeta', PostMeta)
    app.component('ProfileCard', ProfileCard)
    app.component('BreadcrumbNav', BreadcrumbNav)
    app.component('PostNavigation', PostNavigation)
    app.component('PostStats', PostStats)
    app.component('PostStatsAdmin', PostStatsAdmin)
    app.component('GlobalStats', GlobalStats)
    app.component('TagBar', TagBar)
    app.component('ModernPostList', ModernPostList)
    app.component('ModernPostDetail', ModernPostDetail)
    app.component('PostListPage', PostListPage)
    
    // 在客户端环境下初始化统计数据管理器 - 已禁用
    /*
    if (typeof window !== 'undefined') {
      // 使用 nextTick 确保在 DOM 渲染后初始化
      setTimeout(() => {
        initStatsManager()
          .then(() => console.log('统计数据管理器初始化成功'))
          .catch(err => console.error('统计数据管理器初始化失败:', err))
      }, 0)
    }
    */
  }
}