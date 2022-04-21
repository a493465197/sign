'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  assets: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  security: {
    xframe: {
      enable: false,
    },
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  }
};