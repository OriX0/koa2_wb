/*
 * @Description: sequelize类型 整合
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-22 19:14:30
 */
const Sequelize = require('sequelize');
module.exports = {
  STIRNG: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
};
