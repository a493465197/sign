'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/init', controller.home.init);


  router.post('/api/login', controller.api.login);
  router.post('/api/reg', controller.api.reg);


};
