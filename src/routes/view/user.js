/*
 * @Description: user相关操作的路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 21:45:40
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middleware/loginChecks');
/**
 * 获取当前登录的信息
 * @param {ctx} ctx
 * @returns
 */
function getLoginInfo (ctx) {
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
router.get('/setting', loginRedirect, async (ctx, next) => {
  //  用户设置页
  await ctx.render('setting', ctx.session.userInfo);
});
module.exports = router;
