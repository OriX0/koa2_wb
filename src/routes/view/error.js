/*
 * @Description: error 和404的路由
 * @Author: OriX
 * @Date: 2021-05-22 13:58:18
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 14:03:36
 */
const router = require('koa-router')();
router.get('/error', async (ctx, next) => {
  await ctx.render('error');
});
router.get('*', async (ctx, next) => {
  await ctx.render('404');
});
module.exports = router;
