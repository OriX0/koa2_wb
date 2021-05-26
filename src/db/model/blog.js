/*
 * @Description: blog model
 * @Author: OriX
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 20:34:30
 */
const seq = require('../seq');
const { INTEGER, STRING } = require('../types');
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '发该条微博的用户id',
  },
  content: {
    type: STRING,
    allowNull: false,
    comment: '微博内容',
  },
  image: {
    type: STRING,
  },
});

module.exports = Blog;
