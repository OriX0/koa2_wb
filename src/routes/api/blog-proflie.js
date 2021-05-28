/*
 * @Description: 微博个人主页api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 14:47:30
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getBlogListStr } = require('../../utils/blog');
router.prefix('/api/profile');
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  console.log(pageIndex);
  const result = await getProfileBlogList(userName, pageIndex);

  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

module.exports = router;
