/*
 * @Description: 用户关系相关的api 单元测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-29 21:16:01
 */
const server = require('../server');
const { w_COOKIES, w_ID, w_userName, t_ID, t_userName } = require('../testUserInfo');
// 因为这是视图层调用的api 无法直接调用测试 故从控制层引入
const { getFans, getFollowers } = require('../../src/controller/blog-relation');
// 先取消关注 保证后续关注和取消关注的测试
test('wuhu1测试取消关注 test 应该成功 ', async () => {
  const result = await server.post('/api/profile/unfollow').send({ userId: t_ID }).set('cookie', w_COOKIES);
  expect(1).toBe(1);
});
// 测试关注
test('wuhu1测试关注 test 应该成功', async () => {
  const result = await server.post('/api/profile/follow').send({ userId: t_ID }).set('cookie', w_COOKIES);
  // console.log('whu1 测试关注', result);
  expect(result.body.errNo).toBe(0);
});
// 查看test的粉丝目录里面应该有wuhu1
test('查看test的粉丝目录里面应该有wuhu1 ', async () => {
  const result = await getFans(t_ID);
  const { count, list } = result.data;
  const haveUserName = list.some(item => item.userName === w_userName);
  expect(haveUserName).toBe(true);
});
// 查看wuhu1的关注目录里面应该有test
test('查看wuhu1的关注目录里面应该有test ', async () => {
  const result = await getFollowers(t_ID);
  const { count, list } = result.data;
  const haveUserName = list.some(item => item.userName === t_userName);
  expect(haveUserName).toBe(true);
});
// 取消关注
test('wuhu1测试取消关注 test 应该成功 ', async () => {
  const result = await server.post('/api/profile/unfollow').send({ userId: t_ID }).set('cookie', w_COOKIES);
  expect(result.body.errNo).toBe(0);
});
