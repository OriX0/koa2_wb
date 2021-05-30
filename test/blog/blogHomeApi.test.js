/*
 * @Description: 微博 首页 api 测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 20:30:55
 */
const server = require('../server');
const { w_COOKIES } = require('../testUserInfo');
// 测试微博的id
let BLOG_ID = '';

test('创建一条微博 应该创建成功', async () => {
  const content = 'api 测试时候的 测试内容啊';
  const image = 'xx.png';
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image,
    })
    .set('cookie', w_COOKIES);
  expect(res.body.errNo).toBe(0);
  expect(res.body.data.content).toBe(content);
  BLOG_ID = res.body.data.id;
});

test('测试首页第一页  应该正常返回数据 ', async () => {
  const result = await server.get(`/api/blog/loadMore/0`).set('cookie', w_COOKIES);
  expect(result.body.errNo).toBe(0);
  const { data } = result.body;
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('count');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('pageSize');
});
