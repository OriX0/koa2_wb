/*
 * @Description: user api
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 16:12:06
 */
const router = require('koa-router')();
const { isExist, register, login, deleteCurrentUser } = require('../../controller/user');
const userValidate = require('../../validate/user');
const { generateValidate } = require('../../middleware/validate');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middleware/loginChecks')
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
router.post('/login', generateValidate(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // 调用控制层的方法
  ctx.body = await login({ ctx, userName, password });
});
// 删除当前用户 条件：当前已登录  当前为测试环境
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userInfo;
    // 调用控制层的方法
    ctx.body = await deleteCurrentUser(userName);
  }
})
module.exports = router;
