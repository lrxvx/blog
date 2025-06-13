# 博客统计功能说明

本博客使用 Netlify 无服务器函数和 FaunaDB 实现了文章阅读量统计功能，并通过 GitHub Actions 定期备份统计数据。

## 功能特点

- 支持文章访问量、阅读量和阅读时间统计
- 本地存储与云端存储同步
- 定期自动备份统计数据
- 支持导入/导出统计数据

## 设置步骤

### 1. FaunaDB 设置

1. 注册 [FaunaDB](https://fauna.com/) 账号
2. 创建一个新的数据库
3. 在 Security 选项卡中创建一个新的 Server Key
4. 复制生成的密钥

### 2. Netlify 设置

1. 在 Netlify 中导入你的 GitHub 仓库
2. 在 Netlify 的 Site settings > Build & deploy > Environment 中添加环境变量：
   - 变量名：`FAUNA_SECRET`
   - 值：你在 FaunaDB 中创建的 Server Key

3. 部署网站

### 3. 初始化数据库

首次部署后，需要初始化 FaunaDB 数据库：

```bash
# 安装依赖
npm install

# 设置环境变量
export FAUNA_SECRET=your_fauna_secret_key  # Linux/Mac
set FAUNA_SECRET=your_fauna_secret_key     # Windows

# 初始化数据库
npm run bootstrap
```

### 4. GitHub Actions 设置

1. 在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加密钥：
   - 名称：`FAUNA_SECRET`
   - 值：你在 FaunaDB 中创建的 Server Key

2. GitHub Actions 会自动运行，每天备份一次统计数据

## 工作原理

1. 用户访问文章时，统计数据首先存储在浏览器的 localStorage 中
2. 定期（默认 5 分钟）将数据同步到 FaunaDB 云端存储
3. GitHub Actions 每天自动备份云端数据到 `stats-backup` 分支

## 文件结构

```
├── netlify/
│   ├── functions/         # Netlify 无服务器函数
│   │   ├── getStats.js    # 获取统计数据
│   │   └── updateStats.js # 更新统计数据
│   └── scripts/
│       └── bootstrap-fauna-database.js  # 初始化数据库
├── .github/
│   └── workflows/
│       └── backup-stats.yml  # GitHub Actions 备份工作流
└── .vitepress/
    └── theme/
        └── utils/
            └── PostStatsManager.js  # 统计数据管理器
```

## 故障排除

如果统计功能不工作，请检查：

1. Netlify 环境变量是否正确设置
2. FaunaDB 数据库和集合是否已创建
3. 浏览器控制台是否有错误信息
4. Netlify 函数日志中是否有错误

## 手动备份/恢复

在统计管理页面 (`/about/stats.html`) 中，可以：

1. 导出当前统计数据为 JSON 文件
2. 导入之前备份的 JSON 文件恢复统计数据