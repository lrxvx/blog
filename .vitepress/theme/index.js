// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import PostList from './components/PostList.vue'
import PostMeta from './components/PostMeta.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('PostList', PostList)
    app.component('PostMeta', PostMeta)
  }
}