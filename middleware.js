var bodyParser = require('body-parser'),
    cors = require('cors'),
    cacheResponseDirective = require('express-cache-response-directive'),
    legacyExpires = require('express-legacy-expires');

function middleware(app) {
  app.use(cors(app.settings.cors));
  app.use(bodyParser.raw({
    type: '*/*',
    limit: '1mb'
  }));
  app.use(cacheResponseDirective());
  app.use(legacyExpires());
}

module.exports = middleware;
