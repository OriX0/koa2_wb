/*
 * @description: user 登录注册相关的api测试
 * @Author: OriX
 * @Date: 2021-05-25 16:57:18
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 18:15:37
 */
// 引入服务
const server = require('../server');
// 先定义一个测试用的用户信息
const userName = `U_${Date.now()}`;
const password = `P_${Date.now()}`;
const gender = 1;
const testUser = {
  userName,
  password,
  gender,
}
// 定义用于保存登录成功的cookies
let COOKIES = '';
// 注册
test('测试注册功能 结果应该为成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser);
  expect(res.body.errNo).toBe(0)
})
// 重复注册
test('重复注册 应该为失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser);
  expect(res.body.errNo).not.toBe(0)
})
// 测试格式验证
test('重复注册 应该为失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: "12",
      password: '1',
      gender: "xxsas"
    });
  expect(res.body.errNo).not.toBe(0)
})
// 用户名是否存在接口
test('测试用户名是否存在 应该返回存在 ', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errNo).toBe(0)
})

// 登录接口
test('测试登录接口 应该登录成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  expect(res.body.errNo).toBe(0)
  COOKIES = res.headers['set-cookie'].join(';');
  console.log(COOKIES)

})

// 删除用户接口
test('删除当前登录的用户 ', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIES);
  expect(res.body.errNo).toBe(0);
})
// 删除后 查询该用户应该是不存在
test('删除后查询该用户应该是不存在 ', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errNo).not.toBe(0)
})

