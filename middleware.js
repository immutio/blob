var bodyParser = require('body-parser'),
    cors = require('cors'),
    rate = require('express-rate'),
    redis = require('redis'),
    url = require('url'),
    redisClient;

if(process.env.REDISCLOUD_URL) {
  var redisUrl = url.parse(process.env.REDISCLOUD_URL);
  redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  redisClient.auth(redisURL.auth.split(":")[1]);
} else {
  redisClient =redis.createClient();
}

var redisHandler = new rate.Redis.RedisRateHandler({ client: redisClient });

function middleware(app) {
  app.use(cors(app.settings.cors));
  app.use(bodyParser.raw({
    type: '*/*',
    limit: '1mb'
  }));
}

module.exports = middleware;
