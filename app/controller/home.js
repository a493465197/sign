'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const md5 = require('md5')
// const puppeteer = require('puppeteer');
class HomeController extends Controller {
  isPhone (ctx) {
    return ctx.header['user-agent'].includes('Mobile')
  }


  async index() {

    const { ctx } = this;
    // ctx.body= 123
    await ctx.render('index.html');
    // ctx.body = await ctx.renderString(await fs.promises.readFile(path.resolve(__dirname, '../public/index.htm')))
    // ctx.body = await fs.promises.readFile(path.resolve(__dirname, '../public/index.htm'))
  }
  async init() {

    const { ctx } = this;
    let result = this.ctx.request.body;
    let data = await this.ctx.model.User({
      username: '123',
      password: '123'
    });
    data.save();
    ctx.body = data
  }

  
}

module.exports = HomeController;
