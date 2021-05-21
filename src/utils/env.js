/*
 * @Description: 环境变量
 * @Author: OriX
 * @Date: 2021-05-20 17:56:54
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-21 19:32:17
 */
// 获取当前启动时候的环境
const ENV = process.env.NODE_ENV;
module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test',
};
