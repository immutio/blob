var bodyParser = require('body-parser'),
    cors = require('cors')

function middleware(app) {
  app.use(cors());
  app.use(bodyParser.raw({
    type: '*/*',
    limit: '1mb'
  }));
}

module.exports = middleware;
