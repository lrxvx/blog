// 初始化 FaunaDB 数据库的脚本
import { Client, query as q } from 'faunadb';

// 从环境变量获取 FaunaDB 密钥
const faunaSecret = process.env.FAUNA_SECRET;

if (!faunaSecret) {
  console.error('环境变量 FAUNA_SECRET 未设置。请设置 FaunaDB 密钥。');
  process.exit(1);
}

// 创建 FaunaDB 客户端
const client = new Client({
  secret: faunaSecret
});

// 初始化数据库
async function setupFaunaDB() {
  console.log('开始初始化 FaunaDB 数据库...');
  
  try {
    // 创建 stats 集合（如果不存在）
    console.log('正在创建 stats 集合...');
    await client.query(
      q.If(
        q.Exists(q.Collection('stats')),
        true, // 如果集合已存在，则不做任何操作
        q.CreateCollection({ name: 'stats' })
      )
    );
    console.log('stats 集合已创建或已存在');
    
    // 创建一个空的统计数据文档（如果不存在）
    console.log('正在创建初始统计数据...');
    await client.query(
      q.If(
        q.Exists(q.Ref(q.Collection('stats'), 'all')),
        true, // 如果文档已存在，则不做任何操作
        q.Create(q.Ref(q.Collection('stats'), 'all'), {
          data: {}
        })
      )
    );
    console.log('初始统计数据已创建或已存在');
    
    console.log('FaunaDB 数据库初始化完成！');
  } catch (error) {
    console.error('初始化 FaunaDB 数据库失败:', error);
    process.exit(1);
  }
}

// 执行初始化
setupFaunaDB();