/*
 * @Description: 微博 model 测试
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 15:16:30
 */
const { Blog } = require('../../src/db/model/index');
test('验证blog模型的各个属性 ', async () => {
  const testBlog = await Blog.build({
    userId: 1,
    content: '测试微博内容',
    image: '/test.jpg',
  });
  expect(testBlog.userId).toBe(1);
  expect(testBlog.content).toBe('测试微博内容');
  expect(testBlog.image).toBe('/test.jpg');
});
