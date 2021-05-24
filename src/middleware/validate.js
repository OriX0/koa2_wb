/*
 * @Description: json schema 验证中间件
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 17:20:00
 */
const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFailInfo } = require('../model/ErrorInfo');

function generateValidate(validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    const data = ctx.request.body;
    const error = validateFn(data);
    if (error) {
      //验证失败
      ctx.body = new ErrorModel(jsonSchemaFailInfo);
      return;
    }
    // 返回中间件
    await next();
  }
  //
  return validator;
}
module.exports = {
  generateValidate,
};
