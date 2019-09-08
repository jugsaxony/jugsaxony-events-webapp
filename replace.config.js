package = require('./package.json');
module.exports = {
  files: ['www/service-worker.js', 'www/build/main.js'],
  from: ['@TIMESTAMP@', '@APP_VERSION@'],
  to: [(match) => Date.now(), package.version]
};
