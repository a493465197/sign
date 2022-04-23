/* eslint valid-jsdoc: "off" */
const path = require('path')
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.view = {
    mapping: {
      '.html': 'nunjucks',
      '.htm': 'nunjucks',

    },
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'app/public'),
    ].join(',')
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = '_1648381686957_8975';

  // add your middleware config here
  config.middleware = [];
  config.assets = {
    // publicPath: '/a/',
  };
  // config.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: '144.202.8.223',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'dede',
  //     // 密码
  //     password: 'dede',
  //     // 数据库名
  //     database: 'dede',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // }
  config.mongoose = {
    client:{
    url:'mongodb://45.77.106.79/book',
    options:{}
    }
  }
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.static = {
    prefix: '/', 
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    // dynamic: false, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    // preload: true,
    cacheControl: 'no-store', // in prod env, 0 in other envs
    // buffer: true, // in prod env, false in other envs
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    baseUrl: 'http://127.0.0.1:7001/'
  };
  

  return {
    ...config,
    ...userConfig,

  };
};
