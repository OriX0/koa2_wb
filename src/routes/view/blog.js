/*
 * @Description: blog 视图层 路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 20:42:02
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middleware/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getSquareBolgList } = require('../../controller/blog-square');
const { isExist } = require('../../controller/user');
// 访问首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {});
});
// 访问个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});

// 访问他人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params;
  // 调用控制层去获取数据
  let curUserInfo;
  const myUserInfo = ctx.session.userInfo;
  const isMe = curUserName === myUserInfo.userName;
  if (isMe) {
    curUserInfo = myUserInfo;
  } else {
    const existResult = await isExist(curUserName);
    if (existResult.errNo !== 0) {
      return;
    }
    curUserInfo = existResult.data;
  }

  // 获取第一页的数据
  const result = await getProfileBlogList(curUserName);
  const { isEmpty, blogList, count, pageIndex, pageSize } = result.data;
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageIndex,
      pageSize,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
    },
  });
});
// 访问广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 调用控制层 获取缓存数据 获取第一页的数据
  const result = await getSquareBolgList(0);
  const { blogList, isEmpty, pageIndex, pageSize, count } = result.data || {};
  console.log('路由层 获取第一页', blogList);
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageIndex,
      pageSize,
    },
  });
});
module.exports = router;
