var bodyParser = require('body-parser');

function middleware(app) {
  app.use(bodyParser.raw({
    type: '*/*',
    limit: '1mb'
  }));
}

module.exports = middleware;
