// 获取统计数据的无服务器函数
export async function handler(event, context) {
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

    // 导入 FaunaDB 客户端
    const { Client, query: q } = await import('faunadb');
    
    // 创建 FaunaDB 客户端
    const client = new Client({
      secret: faunaSecret
    });

    // 查询统计数据
    // 假设我们有一个名为 'stats' 的集合，其中存储了所有文章的统计数据
    const result = await client.query(
      q.Get(q.Ref(q.Collection('stats'), 'all'))
    );

    // 返回统计数据
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // 允许跨域请求
      },
      body: JSON.stringify(result.data || {})
    };
  } catch (error) {
    console.error('获取统计数据失败:', error);
    
    // 如果是 FaunaDB 的 "instance not found" 错误，说明统计数据还不存在
    if (error.name === 'NotFound') {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({})
      };
    }
    
    // 其他错误返回 500
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: '获取统计数据失败', details: error.message })
    };
  }
}