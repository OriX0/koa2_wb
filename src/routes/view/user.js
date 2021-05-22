/*
 * @Description: user相关操作的路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 19:07:00
 */
const router = require('koa-router')();

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {});
});
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {});
});
module.exports = router;
