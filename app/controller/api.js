'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const md5 = require('md5')
// const puppeteer = require('puppeteer');
class HomeController extends Controller {
  isPhone(ctx) {
    return ctx.header['user-agent'].includes('Mobile')
  }


  async login() {

    const {
      ctx
    } = this;
    const user = await this.ctx.model.User.findOne({
      username: ctx.request.body.username
    })
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
    async logout() {
    const { ctx } = this;
    ctx.cookies.set('user', '')
    ctx.body = {
      code: 0,
    }
  }
  async isLogin() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    const user = await this.ctx.model.User.findOne({
      username
    })
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

    const {
      ctx
    } = this;
    const user = await this.ctx.model.User.findOne({
      username: ctx.request.body.username
    })
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

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    const user = await this.ctx.model.User.findOne({
      username: username
    })
    ctx.body = {
      code: 0,
      value: user
    }
  }

  async setInfo() {

    const {
      ctx
    } = this;
    let result = this.ctx.request.body;
    const username = result.currUser || ctx.cookies.get('user')

    let data = await this.ctx.model.User.updateOne({
      username
    }, result);
    // data.save();
    ctx.body = {
      code: 0
    }
  }
  async bookList() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Book.find();
    ctx.body = {
      code: 0,
      value: data
    }
  }
  async book() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Book.create({
      username,
      ...ctx.request.body
    });
    ctx.body = {
      code: 0
    }

  }
  async yudinList() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Yudin.find({
      username
    });
    ctx.body = {
      code: 0,
      value: data
    }
  }
  async yudin() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Yudin.create({
      username,
      ...ctx.request.body
    });
    ctx.body = {
      code: 0
    }

  }
  async userList() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    let user = await this.ctx.model.User.findOne({
      username
    });
    if (user && user.isAdmin) {
      let users = await this.ctx.model.User.find();
      ctx.body = {
        code: 0,
        value: users
      }
    } else {
      ctx.body = {
        code: -1,
      }
    }

  }

  async delUser() {

    const {
      ctx
    } = this;
    const username = ctx.request.body.username
    let data = await this.ctx.model.User.deleteOne({
      username
    });
    ctx.body = {
      code: 0
    }

  }

  async gonggaoList() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Gonggao.find();
    ctx.body = {
      code: 0,
      value: data
    }
  }
  async gonggao() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Gonggao.create({
      ...ctx.request.body,
      username
    });
    ctx.body = {
      code: 0
    }

  }


  async addBook() {
    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    if (ctx.request.body._id) {
      let data = await this.ctx.model.Book.updateOne({
        _id: ctx.request.body._id
      }, {
        ...ctx.request.body,
        username
      })

    } else {
      delete ctx.request.body._id
      let data = await this.ctx.model.Book.create({
        ...ctx.request.body,
        username
      });
    }


    ctx.body = {
      code: 0
    }
  }
  async myBookList() {
    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let user = await this.ctx.model.User.findOne({
      username
    });
    let book
    if (user && user.isAdmin) {
      book = await this.ctx.model.Book.find();
      ctx.body = {
        code: 0,
        value: book
      }
    } else {
      book = await this.ctx.model.Book.find({
        username
      });
      ctx.body = {
        code: 0,
        value: book
      }
    }
  }
  async buyBookList() {
    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    let book
    book = await this.ctx.model.Book.find({
      buyer: null
    });
    ctx.body = {
      code: 0,
      value: book,
    }
  }
  async delBook() {

    const {
      ctx
    } = this;
    await this.ctx.model.Book.deleteOne({
      _id: ctx.request.body._id
    });
    ctx.body = {
      code: 0
    }
  }
  async buyBook() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Book.updateOne({
      id: ctx.request.body.id
    }, {
      buyer: username
    })
    await this.ctx.model.Order.create({
      buyer: username,
      bookId: ctx.request.body.id,
    })


    ctx.body = {
      code: 0
    }
  }
  async getOrderList() {
    const {
      ctx
    } = this;
    const data = await this.ctx.model.Order.aggregate([{
      $lookup: {
        from: 'book', // 关联的集合
        localField: 'bookId', // 本地关联的字段
        foreignField: 'id', // 对方集合关联的字段
        // as:'mms',  // 结果字段名,
        as: 'book'
      },
    }])

    ctx.body = {
      code: 0,
      value: data
    }
  }
  async orderPj() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    const data = await this.ctx.model.Pj.create({
      pj: ctx.request.body.pj,
      orderId: ctx.request.body.orderId,
      pjer: username
    })
    ctx.body = {
      code: 0
    }
  }
  async orderPjList() {

    const {
      ctx
    } = this;

    const data = await this.ctx.model.Order.aggregate([{
      $lookup: {
        from: 'pj', // 关联的集合
        localField: 'orderId', // 本地关联的字段
        foreignField: 'orderId', // 对方集合关联的字段
        as: 'pj'
      },

    },{
      $lookup: {
        from: 'book', // 关联的集合
        localField: 'bookId', // 本地关联的字段
        foreignField: 'id', // 对方集合关联的字段
        as: 'book'
      },
    }])

    ctx.body = {
      code: 0,
      value: data.filter((e) => e.pj && e.pj.length)
    }
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