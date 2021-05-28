/*
 * @Description:  博客相关api路由
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-27 14:38:54
 */
const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const upload = require('../../middleware/uploadFile');
const { generateValidate } = require('../../middleware/validate');
const validateBlog = require('../../validate/blog');
const { create } = require('../../controller/blog-home');
router.prefix('/api/blog');
router.post('/create', loginCheck, generateValidate(validateBlog), upload.single('file'), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  console.log('userId: ', userId);

  // const image = '/' + ctx.req.file.filename;
  // 调用控制层
  ctx.body = await create({ userId, content, image });
});

module.exports = router;
