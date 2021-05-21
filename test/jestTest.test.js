/*
 * @Description:jestTest 接口的测试
 * @Author: OriX
 * @Date: 2021-05-21 17:42:08
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-21 17:48:25
 */
const server = require('./server');
test('jestTest 接口应该返回title 为jest test json的对象 ', async () => {
  const res = await server.get('/jestTest');
  expect(res.body).toEqual({
    title: 'jest test json',
  });
});
