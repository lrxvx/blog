// 更新统计数据的无服务器函数
export async function handler(event, context) {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: '方法不允许' })
    };
  }

  try {
    // 从环境变量获取 FaunaDB 密钥
    const faunaSecret = process.env.FAUNA_SECRET;
    
    // 如果没有配置 FaunaDB 密钥，返回错误
    if (!faunaSecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: '服务器未正确配置数据库密钥' })
      };
    }

    // 解析请求体中的统计数据
    const statsData = JSON.parse(event.body);
    
    // 导入 FaunaDB 客户端
    const { Client, query: q } = await import('faunadb');
    
    // 创建 FaunaDB 客户端
    const client = new Client({
      secret: faunaSecret
    });

    // 尝试获取现有的统计数据
    let existingData = {};
    try {
      const result = await client.query(
        q.Get(q.Ref(q.Collection('stats'), 'all'))
      );
      existingData = result.data || {};
    } catch (error) {
      // 如果是 "instance not found" 错误，说明统计数据还不存在
      if (error.name !== 'NotFound') {
        throw error; // 如果是其他错误，则抛出
      }
      // 否则继续使用空对象
    }

    // 合并现有数据和新数据
    const mergedData = { ...existingData };
    
    // 遍历新数据中的每篇文章
    Object.entries(statsData).forEach(([postId, stats]) => {
      // 如果文章已存在，则更新其统计数据
      if (mergedData[postId]) {
        mergedData[postId] = {
          views: (mergedData[postId].views || 0) + (stats.views || 0),
          reads: (mergedData[postId].reads || 0) + (stats.reads || 0),
          readTime: (mergedData[postId].readTime || 0) + (stats.readTime || 0)
        };
      } else {
        // 如果文章不存在，则添加新文章
        mergedData[postId] = stats;
      }
    });

    // 更新或创建统计数据
    await client.query(
      q.If(
        q.Exists(q.Ref(q.Collection('stats'), 'all')),
        // 如果文档存在，则更新
        q.Update(q.Ref(q.Collection('stats'), 'all'), {
          data: mergedData
        }),
        // 如果文档不存在，则创建
        q.Create(q.Ref(q.Collection('stats'), 'all'), {
          data: mergedData
        })
      )
    );

    // 返回成功响应
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // 允许跨域请求
      },
      body: JSON.stringify({ success: true, message: '统计数据已更新' })
    };
  } catch (error) {
    console.error('更新统计数据失败:', error);
    
    // 返回错误响应
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: '更新统计数据失败', details: error.message })
    };
  }
}