/*
 * @description:  工具集路由
 * @Author: OriX
 * @Date: 2021-05-25 22:03:03
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 01:27:04
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middleware/loginChecks');
const upload = require('../../middleware/uploadFile')
router.prefix('/api/utils');

router.post('/upload', loginCheck, upload.single('file'), async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: {
      url: '/' + ctx.req.file.filename,
    },
  }

})


module.exports = router;