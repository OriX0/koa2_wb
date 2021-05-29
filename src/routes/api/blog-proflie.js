/*
 * @Description: 微博个人主页 api层
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 17:12:31
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { follow, cancelFollow } = require('../../controller/blog-relation');
const { getBlogListStr } = require('../../utils/blog');
router.prefix('/api/profile');
// 个人主页加载更多微博
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getProfileBlogList(userName, pageIndex);

  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});
// 个人主页 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  // 解析 想要关注的id 和自己的id
  const { userId: wantFollowId } = ctx.request.body;
  const { id: myUserId } = ctx.session.userInfo;
  // 调用控制层
  ctx.body = await follow(myUserId, wantFollowId);
});

// 个人主页 取消关注
router.post('/unfollow', loginCheck, async (ctx, next) => {
  // 解析 想要关注的id 和自己的id
  const { userId: wantFollowId } = ctx.request.body;
  const { id: myUserId } = ctx.session.userInfo;
  // 调用控制层
  ctx.body = await cancelFollow(myUserId, wantFollowId);
});

module.exports = router;
