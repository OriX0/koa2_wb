/*
 * @Description: 广场页的 单元测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-28 21:12:42
 */

const server = require('../server');
const { COOKIES } = require('../testUserInfo');

test('测试获取广场页数据 应该正常返回 ', async () => {
  const result = await server.get('/api/square/loadMore/0').set('cookie', COOKIES);
  expect(result.body.errNo).toBe(0);
  const { data } = result.body;
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('count');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('pageSize');
});
