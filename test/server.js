/*
 * @Description: jest server 用于接口测试
 * @Author: OriX
 * @Date: 2021-05-21 17:33:22
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-21 17:41:19
 */
const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);
