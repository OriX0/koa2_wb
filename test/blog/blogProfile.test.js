/*
 * @Description: 微博个人主页 api测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 15:56:26
 */

const { COOKIES, userName } = require('../testUserInfo');
const server = require('../server');

test('测试个人主页第一页  应该正常返回数据 ', async () => {
  const result = await server.get(`/api/profile/loadMore/${userName}/0`).set('cookie', COOKIES);
  expect(result.body.errNo).toBe(0);
  const { data } = result.body;
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('count');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('pageSize');
});
