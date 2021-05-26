/*
 * @Description: blog 视图层 路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 20:46:08
 */
const router = require('koa-router')();
const { loginRedirect } = require('../../middleware/loginChecks');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {});
});

module.exports = router;
