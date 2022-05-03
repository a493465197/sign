const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers: 1,
  baseDir: __dirname,
  port: 7004
});