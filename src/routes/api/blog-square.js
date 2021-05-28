/*
 * @Description: 博客广场页的路由api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 20:47:37
 */
const router = require('koa-router')();
const { getSquareBolgList } = require('../../controller/blog-square');
router.prefix('/api/square');
router.get('/loadMore/:pageIndex', async (ctx, next) => {
  let { pageIndex } = ctx.params;
  // 获取第一页的内
  pageIndex = parseInt(pageIndex);
  // 调用缓存层
  const result = await getSquareBolgList(pageIndex);

  ctx.body = result;
});

module.exports = router;
