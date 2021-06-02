/*
 * @Description: 艾特me页面相关api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-06-02 14:31:24
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middleware/loginChecks');
const { getBlogListStr } = require('../../utils/blog');
const { getAtMeBlog } = require('../../controller/blog-at');
router.prefix('/api/atMe');
router.get('/loadMore/:pageIndex', loginRedirect, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const { id: myUserId } = ctx.session.userInfo;
  const blogResult = await getAtMeBlog(myUserId, pageIndex);
  blogResult.data.blogListTpl = getBlogListStr(blogResult.data.blogList, true);
  ctx.body = blogResult;
});

module.exports = router;
