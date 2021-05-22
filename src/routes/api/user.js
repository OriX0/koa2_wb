/*
 * @Description: user api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 21:52:54
 */
const router = require('koa-router')();
const { isExist } = require('../../controller/user');
router.prefix('/api/user');
// 用户名是否存在
router.post('isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  // 调用方法获得返回数据
  const res = await isExist(userName);
  ctx.body = res;
});
// 注册
router.post('/register', async (ctx, next) => {});
// 登录
router.post('/login', async (ctx, next) => {});
module.exports = router;
