/*
 * @Description:
 * @Author: OriX
 * @Date: 2021-05-14 14:58:40
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-21 13:45:56
 */
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  // 使用session 以触发 session持久化
  const session = ctx.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum,
  };
});

module.exports = router;
