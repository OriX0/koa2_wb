/*
 * @Description: 微博 api 测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 15:48:16
 */
const server = require('../server');
const { COOKIES } = require('../testUserInfo');
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
    .set('cookie', COOKIES);
  expect(res.body.errNo).toBe(0);
  expect(res.body.data.content).toBe(content);
  BLOG_ID = res.body.data.id;
});
