var rate = require('express-rate'),
    redis = require('redis'),
    url = require('url'),
    redisClient;

if(process.env.REDISCLOUD_URL) {
  var redisUrl = url.parse(process.env.REDISCLOUD_URL);
  redisClient = redis.createClient(redisUrl.port, redisUrl.hostname, { no_ready_check: true });
  redisClient.auth(redisUrl.auth.split(":")[1]);
} else {
  redisClient = redis.createClient();
}

var redisHandler = new rate.Redis.RedisRateHandler({ client: redisClient });
var limiterMiddleware = rate.middleware({
  handler: redisHandler,
  interval: 1,
  limit: 1,
  setHeadersHandler: function (req, res, rate, limit, resetTime) {
    var remaining = limit - rate;

    if (remaining < 0) {
        remaining = 0;
    }

    // follows Twitter's rate limiting scheme and header notation
    // https://dev.twitter.com/docs/rate-limiting/faq#info
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetTime);
  },
  onLimitReached: function (req, res, rate, limit, resetTime, next) {
    res.status(429).send("Rate Limit exceeded. Check headers for limit information.");
  }
});

module.exports = limiterMiddleware;
