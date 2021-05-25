/*
 * @Description: sequelize类型 整合
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 16:47:33
 */
const Sequelize = require('sequelize');
module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
};
