'use strict';
const path = require('path')
const fs = require('fs')
const Controller = require('egg').Controller;
const child_process = require('child_process')
const md5 = require('md5')
// const puppeteer = require('puppeteer');
const svgCaptcha = require('svg-captcha')
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
  async keyList() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let data = await this.ctx.model.Key.find();
    ctx.body = {
      code: 0,
      value: data
    }
  }
  async key() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    let data = await this.ctx.model.Key.create({
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


  async addKey() {
    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    if (ctx.request.body.id) {
      let data = await this.ctx.model.Key.updateOne({
        id: ctx.request.body.id
      }, {
        ...ctx.request.body,
        username
      })

    } else {
      delete ctx.request.body.id
      let data = await this.ctx.model.Key.create({
        ...ctx.request.body,
        username
      });
    }


    ctx.body = {
      code: 0
    }
  }
  async myKeyList() {
    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    let user = await this.ctx.model.User.find({username});

    let key
    if (user && user.isAdmin) {
      key = await this.ctx.model.Key.find();
      ctx.body = {
        code: 0,
        value: key
      }
    } else {
      key = await this.ctx.model.Key.find(
        {$or: [{username}, {users: {$in: username}}]}
        
      );
      ctx.body = {
        code: 0,
        value: key
      }
    }
  }
  async keyList() {
    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    const body = ctx.request.body
    const startTime = body.startTime || 1
    const endTime = body.endTime || 164915607195700
    delete body.startTime
    delete body.endTime
    const queryObj = {
      time: {
        $gt: startTime,
        $lt: endTime
      },
      ...body
    }
    const key = await this.ctx.model.Key.find({
      time: {
        $gt: startTime,
        $lt: endTime
      },

      ...body,
      title: new RegExp(body.title),
      id: new RegExp(body.id),


    });
    ctx.body = {
      code: 0,
      value: key
    }
  }

  async delKey() {

    const {
      ctx
    } = this;

    await this.ctx.model.Key.deleteOne({
      id: ctx.request.body.id
    });
    ctx.body = {
      code: 0
    }
  }

  async sign() {
    const {
      ctx
    } = this;
    try {
      const username = ctx.cookies.get('user')
      const body = ctx.request.body
      const currFile = body.file?.fileList && body.file?.fileList[0]
      const key = await this.ctx.model.Key.findOne({id: body.keyId})

      await new Promise((resolve, reject) => {
        const cmd = `jarsigner -verbose -keystore /Users/lizheyu/android.keystore -storepass 123456 -signedjar ${path.resolve(__dirname, '../public', '.'+currFile.response.filePathName.replace('.apk', 'sign.apk'))} ${path.resolve(__dirname, '../public', '.'+currFile.response.filePathName)} lzy`
        child_process.exec(cmd, {maxBuffer: 100000000, shell: '/bin/bash'}, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error)
          }
          resolve()
        })

        // child_process.spawn(cmd).stdout.on('data', (v) => {
        //   console.log('vvvvvv', v)
        // })


      })
      const fileBin = await fs.promises.readFile(path.resolve(__dirname, '../public', '.'+currFile.response.filePathName.replace('.apk', 'sign.apk')))

      await this.ctx.model.Sign.create({
        username,
        keyId: body.keyId,
        jarSignFile: currFile.response.filePathName.replace('.apk', 'sign.apk'),
        jarUnSignFile: currFile.response.filePathName,
        file: body.file,
        sign: md5(Array.from(fileBin).join('') + key.key)
  
      })
    }catch (e) {
      ctx.body = {
        code: -1,
        msg: e
      }
      return
    }

    ctx.body = {
      code: 0
    }
  }
  async signList() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')

    const list = await this.ctx.model.Sign.aggregate([
      {
        $lookup:{
            from:'key',  // 关联的集合
            localField:'keyId',  // 本地关联的字段
            foreignField:'id',  // 对方集合关联的字段
            as:'key',  // 结果字段名,
        },
   
        
    },
    {
      $match: {
        username
      }
    }

    ])
    ctx.body = {
      code: 0,
      value: list
    }
  }
  async delSign() {

    const {
      ctx
    } = this;
    await this.ctx.model.Sign.deleteOne(ctx.request.body)
    ctx.body = {
      code: 0
    }
  }
  async getKeyAuth() {

    const {
      ctx
    } = this;
    const username = ctx.cookies.get('user')
    const old = await this.ctx.model.GetKeyAuth.find({
      keyId: ctx.request.body.keyId,
      username,
      isComp: false
    })
    if (old.length) {
      ctx.body = {
        code: 0
      }
      return
    }

    await this.ctx.model.GetKeyAuth.create({
      keyId: ctx.request.body.keyId,
      username
    })
    
    ctx.body = {
      code: 0
    }
  }
  async getKeyAuthList() {

    const {
      ctx
    } = this;
    const list = await this.ctx.model.GetKeyAuth.aggregate([
      {
        $lookup:{
            from:'key',  // 关联的集合
            localField:'keyId',  // 本地关联的字段
            foreignField:'id',  // 对方集合关联的字段
            as:'key',  // 结果字段名,
        },
    },
    ...(ctx.request.body.hasOwnProperty('isComp') || ctx.request.body.hasOwnProperty('isAgree') ? [{
      $match: {
        isAgree: ctx.request.body.isAgree,
        isComp: ctx.request.body.isComp
      }
    }] : [])
    ])

    ctx.body = {
      code: 0,
      value: list
    }
  }
  async agreeGetKeyAuth() {
    const {
      ctx
    } = this;
    const body = ctx.request.body
    
    const auth = await this.ctx.model.GetKeyAuth.findOne({id: body.id})
    const key = await this.ctx.model.Key.findOne({id: body.keyId})
    key.users.push(auth.username)
    await this.ctx.model.GetKeyAuth.updateOne({id: body.id}, {isComp: true, isAgree: body.isAgree})
    await this.ctx.model.Key.updateOne({id: body.keyId}, {users: key.users})
    ctx.body = {
      code: 0
    }
  }
  async getCode() {
    const {
      ctx
    } = this;
    var captcha = svgCaptcha.create();
    ctx.body = {
      code: 0,
      value: captcha
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