/*
 * @Description: @相关测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-06-02 15:52:38
 */
const server = require('../server');
const { w_COOKIES, t_COOKIES, t_userName } = require('../testUserInfo');
let BLOG_ID;
// wuhu1创建一条微博 @test 应该成功
test('wuhu1创建一条微博 @test 应该成功 ', async () => {
  const content = '这是单元测试的艾特@test-' + t_userName;
  const result = await server.post('/api/blog/create').send({ content }).set('cookie', w_COOKIES);
  expect(result.body.errNo).toBe(0);
  BLOG_ID = result.body.data.id;
});
// test 查看 @我的页面中应该有 该id的博客
test('test 查看 @我的页面中应该有该id的博客 ', async () => {
  const result = await server.get('/api/atMe/loadMore/0').set('cookie', t_COOKIES);
  const { blogList } = result.body.data;
  const haveThisBlog = blogList.some(blog => blog.id == BLOG_ID);
  expect(haveThisBlog).toBe(true);
});
