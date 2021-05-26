/*
 * @description:
 * @Author: OriX
 * @Date: 2021-05-13 20:49:53
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 20:45:29
 */
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const koa_static = require('koa-static');
// 引入koa 操作session和redis的库
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
// 视图路由
const blogViewRouter = require('./routes/view/blog');
const userViewRouter = require('./routes/view/user');
const errorViewRouter = require('./routes/view/error');
// api路由
const utilsApiRouter = require('./routes/api/utils');
const userApiRouter = require('./routes/api/user');
// 引入 用于session持久化的redis 配置
const { REDIS_CONF } = require('./conf/db');
const { SESSION_SECRET_KEY } = require('./conf/secretKey');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
// 使用静态文件解析中间件
app.use(koa_static(__dirname + '/public'));
app.use(koa_static(path.join(__dirname, '..', 'uploadFiles')));

// 使用ejs引擎
app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);
// session配置
app.keys = [SESSION_SECRET_KEY]; // 加密秘钥
app.use(
  session({
    key: 'weibo_sid', // cookies的名字
    prefix: 'weibo:sess', // redis key 的前缀 默认是koa sess
    cookie: {
      path: '/',
      httpOnly: true, // 是否只能后端操作session
      maxAge: 24 * 60 * 60 * 1000, // cookie的过期时间 同时也会设置ttl（redis）的过期时间 默认和这个一样
    },
    // ttl:24*60*60*1000
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);
// logger 相当于演示手写logger
/* app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}) */

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
