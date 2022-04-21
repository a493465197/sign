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


  async login() {

    const { ctx } = this;
    const user = await this.ctx.model.User.findOne({username: ctx.request.body.username})
    if (user && user.password === ctx.request.body.password) {
      ctx.cookies.set('user', user.username)
      ctx.body = {
        code: 0,
        msg: "登录成功"
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "账号或密码错误"
      }
    }

  }
  async reg() {

    const { ctx } = this;
    const user = await this.ctx.model.User.findOne({username: ctx.request.body.username})
    if (user) {
      ctx.body = {
        code: -1,
        msg: "账号有人使用"
      }
    } else {
      let data = await this.ctx.model.User.create({
        username: ctx.request.body.username,
        password: ctx.request.body.password
      });
      ctx.body = {
        code: 0,
        msg: "注册成功"
      }
    }

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
