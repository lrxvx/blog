
---
layout: page
---

<script setup>
import { useRouter } from 'vitepress'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  // 重定向到tags页面
  router.go('/tags/')
})
</script>

<template>
  <div>
    <p>正在跳转到标签页面...</p>
  </div>
</template>