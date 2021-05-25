/*
 * @Description: 数据库配置
 * @Author: OriX
 * @Date: 2021-05-20 17:41:45
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 17:30:35
 */
const { isProd } = require('../utils/env');
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
};
let MYSQL_CONF = {
  host: '127.0.0.1',
  prot: '3306',
  user: 'root',
  password: '12345wszcx',
  database: 'koa2_wb_db',
};
if (isProd) {
  // 如果是生产环境 则使用生产环境下的配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  };
  MYSQL_CONF = {
    host: '127.0.0.1',
    prot: '3306',
    user: 'root',
    password: '',
    database: 'koa_wb_db',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
