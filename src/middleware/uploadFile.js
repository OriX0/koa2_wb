/*
 * @description: 上传文件中间件 调用 koa-multer
 * @Author: OriX
 * @Date: 2021-05-26 01:23:19
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-26 01:27:46
 */
const path = require('path');
const multer = require('koa-multer');
const fse = require('fs-extra');

// 上传文件储存目录
const DIST_FOLDER_PATH = path.join(__dirname, "..", '..', 'uploadFiles')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIST_FOLDER_PATH)
  },
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})
// 上传文件配置
const limits = {
  fileSize: 500 * 1024, //文件大小 单位b
  files: 1,
}

const upload = multer({ storage, limits }); // 加载multer


module.exports = upload;