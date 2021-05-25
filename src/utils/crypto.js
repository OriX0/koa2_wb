/*
 * @Description: 数据加密模块
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-25 15:40:20
 */
const crypto = require('crypto');
const { CRYPTO_SECRET_KEY } = require('../conf/secretKey');
/**
 * md5加密方法
 * @param {String} content  需要加密的数据
 * @returns
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}
/**
 * 自制混淆加密方法
 * @param {String} content  需要加密的明文
 */
function doCrypto (content) {
  const str = `str=${content},scecretKey=${CRYPTO_SECRET_KEY}`;
  return _md5(str);
}

module.exports = doCrypto;
