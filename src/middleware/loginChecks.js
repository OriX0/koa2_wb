/*
 * @Description: 登录验证的中间件
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-24 20:56:58
 */
const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');
/**
 * API的登录验证
 * @param {ctx} ctx
 * @param {next} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已经登录
    await next();
    return;
  }
  // 未登录 返回错误信息
  return new ErrorModel(loginCheckFailInfo);
}

async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已经登录
    await next();
    return;
  }
  let currentUrl = ctx.url;
  ctx.redirect('login?url=' + encodeURIComponent(currentUrl));
}

module.exports = {
  loginCheck,
  loginRedirect,
};
