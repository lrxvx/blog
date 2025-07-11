// SEO优化配置文件
// 全球推广关键词策略

export const seoConfig = {
  // 核心关键词集群
  primaryKeywords: {
    chinese: [
      '副业创业', '副业思考', '自媒体创业', '在职副业',
      '副业方法论', '副业资源', '公众号运营', '写作赚钱',
      '职场副业', '副业100问', '写作100问', '小路副业'
    ],
    english: [
      'side hustle', 'freelancing', 'content creation', 'social media marketing',
      'online business', 'passive income', 'digital marketing', 'entrepreneurship',
      'work from home', 'content monetization', 'personal branding', 'creator economy'
    ]
  },

  // 长尾关键词
  longTailKeywords: {
    chinese: [
      '如何在职场做副业', '公众号新人没有流量怎么办', '写作如何坚持日更',
      '副业创业从零开始', '自媒体变现方法', '在职员工副业指南',
      '副业思考框架', '职场人士副业选择', '副业创业成功案例',
      '自媒体内容创作技巧', '公众号运营策略', '写作变现路径'
    ],
    english: [
      'how to start a side hustle while working full time',
      'content creation for beginners', 'social media monetization strategies',
      'freelancing tips for professionals', 'online business ideas',
      'passive income streams', 'digital marketing for creators',
      'work from home opportunities', 'entrepreneurship mindset',
      'content creator success stories', 'personal brand building'
    ]
  },

  // 页面特定SEO配置
  pageConfigs: {
    home: {
      title: '小路副业创业指南 | 副业思考·自媒体创业·在职副业方法论',
      description: '专注副业创业指导，提供副业思考、自媒体创业信息、副业资源和在职场做副业的实用方法论。帮助职场人士开启副业之路，实现财务自由。',
      keywords: '副业创业,自媒体创业,在职副业,副业方法论,side hustle,entrepreneurship'
    },
    posts: {
      title: '副业创业文章 | 实用方法论与经验分享',
      description: '分享副业创业实战经验，包括公众号运营、写作变现、自媒体创业等领域的深度思考和实用方法论。',
      keywords: '副业文章,创业经验,公众号运营,写作变现,自媒体创业'
    },
    tags: {
      title: '副业创业标签分类 | 按主题浏览内容',
      description: '按标签分类浏览副业创业相关内容，包括副业100问、写作100问、公众号运营等主题。',
      keywords: '副业标签,创业分类,内容标签,主题分类'
    },
    about: {
      title: '关于小路 | 副业创业导师与实践者',
      description: '小路，专注副业创业指导的实践者，分享在职场做副业的方法论和实战经验。',
      keywords: '小路,副业导师,创业导师,自媒体创业者'
    }
  },

  // 结构化数据配置
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': '小路副业创业指南',
      'description': '专注副业创业指导的知识分享平台',
      'url': 'https://yourdomain.com',
      'logo': 'https://yourdomain.com/images/logo.png',
      'sameAs': [
        'https://github.com/yourusername',
        'https://twitter.com/yourusername'
      ]
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': '小路副业创业指南',
      'description': '专注副业创业指导，提供副业思考、自媒体创业信息、副业资源和在职场做副业的实用方法论',
      'url': 'https://yourdomain.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://yourdomain.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': '首页',
          'item': 'https://yourdomain.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': '文章',
          'item': 'https://yourdomain.com/posts/'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': '标签',
          'item': 'https://yourdomain.com/tags/'
        }
      ]
    }
  },

  // 国际化SEO配置
  i18n: {
    'zh-CN': {
      siteName: '小路副业创业指南',
      siteDescription: '专注副业创业指导，提供副业思考、自媒体创业信息、副业资源和在职场做副业的实用方法论',
      locale: 'zh_CN'
    },
    'en-US': {
      siteName: 'Side Hustle & Entrepreneurship Guide by Xiaolu',
      siteDescription: 'Expert guidance on side hustles, content creation, and entrepreneurship. Practical methods for professionals to start and grow their side businesses.',
      locale: 'en_US'
    }
  },

  // 社交媒体优化
  socialMedia: {
    twitter: {
      site: '@yourusername',
      creator: '@yourusername',
      card: 'summary_large_image'
    },
    facebook: {
      appId: 'your-facebook-app-id'
    },
    linkedin: {
      company: 'your-linkedin-company'
    }
  },

  // 搜索引擎优化建议
  seoTips: {
    contentStrategy: [
      '定期发布高质量的副业创业相关内容',
      '优化文章标题，包含目标关键词',
      '使用内部链接连接相关文章',
      '添加图片alt标签，提升可访问性',
      '保持内容更新频率，提升网站活跃度'
    ],
    technicalSEO: [
      '优化页面加载速度',
      '确保移动端友好性',
      '添加sitemap.xml',
      '设置robots.txt',
      '使用HTTPS协议',
      '优化URL结构'
    ],
    linkBuilding: [
      '与其他副业创业博客建立友情链接',
      '在相关论坛和社区分享内容',
      '参与行业讨论，建立权威性',
      '创建高质量的资源页面吸引外链'
    ]
  }
}

export default seoConfig