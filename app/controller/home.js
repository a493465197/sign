'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const md5 = require('md5')
// const apktool = require('../tools/node_apktool')
// const puppeteer = require('puppeteer');
class HomeController extends Controller {
  isPhone(ctx) {
    return ctx.header['user-agent'].includes('Mobile')
  }


  async index() {

    const {
      ctx
    } = this;
    // ctx.body= 123
    await ctx.render('index.html');
    // ctx.body = await ctx.renderString(await fs.promises.readFile(path.resolve(__dirname, '../public/index.htm')))
    // ctx.body = await fs.promises.readFile(path.resolve(__dirname, '../public/index.htm'))
  }
  async init() {

    const {
      ctx
    } = this;

    // apktool.resigned_apk(path.resolve(__dirname, "../public/unsign.apk"), path.resolve(__dirname, "../public/sign.apk"), "~android/keystore", "123456", "lzy", function (err, result) {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(result);
    // });

    ctx.body = 123
  }


}

module.exports = HomeController;