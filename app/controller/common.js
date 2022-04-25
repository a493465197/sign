'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const md5 = require('md5')
const moment = require('moment')
// const puppeteer = require('puppeteer');
class HomeController extends Controller {
  isPhone(ctx) {
    return ctx.header['user-agent'].includes('Mobile')
  }


  
  async upload() {

    const {
      ctx
    } = this;


    let stream = await this.ctx.getFileStream();
    const newTime = new Date();                                          //当前时间
    let fileBasePath = this.config.uploadBaseDir;                        //上传根目录
    let filePath = moment(new Date()).format('/YYYYMMDD/');               //上传目录
    let fileName = md5(newTime) +  path.extname(stream.filename);        //文件名
    let filePathName = path.join(filePath, fileName);                    //文件完整路径
    let uploadPath = path.join(fileBasePath, filePathName);              //上传完整路径

    let uploadDir  = path.join(fileBasePath, filePath);
    if (!fs.existsSync(uploadDir))                                       //判断目录是都存在，不存在创建
        fs.mkdirSync(uploadDir, {recursive: true});   //recursive 参数是是否递归创建

    let writerStream = fs.createWriteStream(uploadPath);
    stream.pipe(writerStream);
    writerStream.on('error', function(err) {
        throw err.stack;
    });
    ctx.body = {
        filePath: filePath,
        fileName: fileName,
        filePathName: filePathName,
    };
  }
  
  async init() {

    const {
      ctx
    } = this;
    ctx.body = {
      code: 0
    }
  }


}

module.exports = HomeController;