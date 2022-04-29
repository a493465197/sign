'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/init', controller.home.init);


  router.post('/api/login', controller.api.login);
  router.post('/api/logout', controller.api.logout);
  router.post('/api/reg', controller.api.reg);
  router.get('/api/isLogin', controller.api.isLogin);
  router.get('/api/getInfo', controller.api.getInfo);
  router.post('/api/setInfo', controller.api.setInfo);
  router.post('/api/key', controller.api.key);
  router.post('/api/keyList', controller.api.keyList);
  // router.post('/api/yudin', controller.api.yudin);
  // router.post('/api/yudinList', controller.api.yudinList);
  // router.post('/api/setUser', controller.api.setUser);
  router.post('/api/userList', controller.api.userList);
  router.post('/api/delUser', controller.api.delUser);
  // router.post('/api/gonggao', controller.api.gonggao);
  // router.post('/api/gonggaoList', controller.api.gonggaoList);

  router.post('/api/addKey', controller.api.addKey);
  router.post('/api/myKeyList', controller.api.myKeyList);
  router.post('/api/keyList', controller.api.keyList);
  router.post('/api/delKey', controller.api.delKey);
  router.post('/api/sign', controller.api.sign);
  router.post('/api/signList', controller.api.signList);
  router.post('/api/delSign', controller.api.delSign);
  router.post('/api/getKeyAuth', controller.api.getKeyAuth);
  router.post('/api/getKeyAuthList', controller.api.getKeyAuthList);
  router.post('/api/agreeGetKeyAuth', controller.api.agreeGetKeyAuth);


  router.post('/common/upload', controller.common.upload);


};
