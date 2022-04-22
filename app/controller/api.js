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
  async isLogin() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')
    const user = await this.ctx.model.User.findOne({username})
    if (user && user.username) {
      ctx.body = {
        code: 0,
        msg: "yidenlu"
      }
    } else {

      ctx.body = {
        code: 1,
        msg: "未登录"
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
  async getInfo() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')
    const user = await this.ctx.model.User.findOne({username: username})
    ctx.body = {
      code: 0,
      value:user
    }
  }

  async setInfo() {

    const { ctx } = this;
    let result = this.ctx.request.body;
    const username = result.currUser || ctx.cookies.get('user')

    let data = await this.ctx.model.User.updateOne({username}, result);
    // data.save();
    ctx.body = {
      code: 0
    }
  }
  async dakaList() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Daka.find({username});
    ctx.body = {
      code: 0,
      value:data
    }
  }
  async daka() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Daka.create({username});
    ctx.body = {
      code: 0
    }

  }
  async yudinList() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Yudin.find({username});
    ctx.body = {
      code: 0,
      value:data
    }
  }
  async yudin() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Yudin.create({username, ...ctx.request.body});
    ctx.body = {
      code: 0
    }

  }
  async userList() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')
    let user = await this.ctx.model.User.findOne({username});
    if (user && user.isAdmin) {
      let users = await this.ctx.model.User.find();
      ctx.body = {
        code: 0,
        value:users
      }
    }else {
      ctx.body = {
        code: -1,
      }
    }

  }

  async delUser() {

    const { ctx } = this;
    const username = ctx.request.body.username
    let data = await this.ctx.model.User.deleteOne({username});
    ctx.body = {
      code: 0
    }

  }

  async gonggaoList() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Gonggao.find();
    ctx.body = {
      code: 0,
      value:data
    }
  }
  async gonggao() {

    const { ctx } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Gonggao.create({...ctx.request.body, username});
    ctx.body = {
      code: 0
    }

  }


  async init() {

    const { ctx } = this;
    ctx.body = {
      code: 0
    }
  }

  
}

module.exports = HomeController;
