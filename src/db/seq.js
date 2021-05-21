/*
 * @Description: sequelize 实例
 * @Author: OriX
 * @Date: 2021-05-21 19:12:27
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-21 19:34:02
 */
const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isTest } = require('../utils/env');
const { host, database, user, password } = MYSQL_CONF;
const conf = {
  host,
  dialect: 'mysql',
};
// 如果是测试环境 就不让输出 mysql的语句了
if (isTest) {
  conf.logging = () => {};
}
const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
