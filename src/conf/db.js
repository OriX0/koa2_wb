/*
 * @Description: 数据库配置
 * @Author: OriX
 * @Date: 2021-05-20 17:41:45
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-20 18:44:32
 */
const { isProd } = require('../utils/env');
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
};
if (isProd) {
  // 如果是生产环境 则使用生产环境下的配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  };
}

module.exports = {
  REDIS_CONF,
};
