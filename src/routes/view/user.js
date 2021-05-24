/*
 * @Description: user相关操作的路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 20:35:36
 */
const router = require('koa-router')();
/**
 * 获取当前登录的信息
 * @param {ctx} ctx
 * @returns
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false,
  };
  let userInfo = ctx.session.userInfo;
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    };
  }
  return data;
}
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx));
});
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx));
});
module.exports = router;
