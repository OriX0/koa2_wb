/*
 * @Description: blog 视图层 路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 19:54:03
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middleware/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getSquareBolgList } = require('../../controller/blog-square');
const { getFans, getFollowers } = require('../../controller/blog-relation');
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
  const userId = curUserInfo.id;
  // 获取第一页的数据
  const blogResult = await getProfileBlogList(curUserName);
  const { isEmpty, blogList, count, pageIndex, pageSize } = blogResult.data;
  // 获取粉丝列表
  const fansResult = await getFans(userId);
  const { count: fansCount, list: fansList } = fansResult.data;
  // 获取我是否关注了此人
  // 遍历粉丝列表 看看其中有没有我
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserInfo.userName;
  });
  // 获取关注列表
  const followerResult = await getFollowers(userId);
  const { count: followerCount, list: followerList } = followerResult.data;
  console.log('api层 ', followerList);
  // 渲染页面
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
      amIFollowed,
      fansData: {
        count: fansCount,
        list: fansList,
      },
      followersData: {
        count: followerCount,
        list: followerList,
      },
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
