// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import PostList from './components/PostList.vue'
import PostMeta from './components/PostMeta.vue'
import ProfileCard from './components/ProfileCard.vue'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import PostNavigation from './components/PostNavigation.vue'
import Layout from './Layout.vue'

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
  }
}