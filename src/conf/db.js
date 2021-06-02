/*
 * @Description: 数据库配置
 * @Author: OriX
 * @Date: 2021-05-20 17:41:45
 * @LastEditors: OriX
 * @LastEditTime: 2021-06-02 19:57:44
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
  password: '你的密码',
  database: '你的数据库名',
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
    password: '你的密码',
    database: '你的数据库名',
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
