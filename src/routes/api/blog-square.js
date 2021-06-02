/*
 * @Description: 博客广场页的路由api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-06-02 14:38:17
 */
const router = require('koa-router')();
const { getSquareBolgList } = require('../../controller/blog-square');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/square');
router.get('/loadMore/:pageIndex', async (ctx, next) => {
  let { pageIndex } = ctx.params;
  // 获取第一页的内
  pageIndex = parseInt(pageIndex);
  // 调用缓存层
  const result = await getSquareBolgList(pageIndex);
  result.data.blogListTpl = getBlogListStr(result.data.blogList, true);
  ctx.body = result;
});

module.exports = router;
