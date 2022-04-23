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
  router.get('/api/isLogin', controller.api.isLogin);
  router.get('/api/getInfo', controller.api.getInfo);
  router.post('/api/setInfo', controller.api.setInfo);
  router.post('/api/book', controller.api.book);
  router.post('/api/bookList', controller.api.bookList);
  router.post('/api/yudin', controller.api.yudin);
  router.post('/api/yudinList', controller.api.yudinList);
  // router.post('/api/setUser', controller.api.setUser);
  router.post('/api/userList', controller.api.userList);
  router.post('/api/delUser', controller.api.delUser);
  router.post('/api/gonggao', controller.api.gonggao);
  router.post('/api/gonggaoList', controller.api.gonggaoList);

  router.post('/api/addBook', controller.api.addBook);
  router.post('/api/myBookList', controller.api.myBookList);
  router.post('/api/buyBookList', controller.api.buyBookList);
  router.post('/api/delBook', controller.api.delBook);
  router.post('/api/buyBook', controller.api.buyBook);
  router.post('/api/getOrderList', controller.api.getOrderList);
  router.post('/api/orderPj', controller.api.orderPj);
  router.post('/api/orderPjList', controller.api.orderPjList);
};
