/*
 * @Description:  博客相关api路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-30 20:21:19
 */
const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const upload = require('../../middleware/uploadFile');
const { generateValidate } = require('../../middleware/validate');
const validateBlog = require('../../validate/blog');
const { create, getHomeBlog } = require('../../controller/blog-home');
const { getBlogListStr } = require('../../utils/blog');
router.prefix('/api/blog');
router.post('/create', loginCheck, generateValidate(validateBlog), upload.single('file'), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  console.log('userId: ', userId);

  // const image = '/' + ctx.req.file.filename;
  // 调用控制层
  ctx.body = await create({ userId, content, image });
});
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getHomeBlog(userId, pageIndex);
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

module.exports = router;
