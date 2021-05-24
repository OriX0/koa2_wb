/*
 * @Description: user api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 17:17:34
 */
const router = require('koa-router')();
const { isExist, register } = require('../../controller/user');
const userValidate = require('../../validate/user');
const { generateValidate } = require('../../middleware/validate');
router.prefix('/api/user');
// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  // 调用方法获得返回数据
  const res = await isExist(userName);
  ctx.body = res;
});
// 注册
router.post('/register', generateValidate(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  // 调用方法
  const res = await register({ userName, password, gender });
  ctx.body = res;
});
// 登录
router.post('/login', async (ctx, next) => {});
module.exports = router;
