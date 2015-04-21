var Blob = require('./models/blob'),
    cors = require('cors'),
    fs = require('fs'),
    indexView = fs.readFileSync('views/index.md'),
    rate = require('express-rate'),
    redis = require('redis'),
    url = require('url'),
    redisClient;

if(process.env.REDISCLOUD_URL) {
  var redisUrl = url.parse(process.env.REDISCLOUD_URL);
  redisClient = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
  redisClient.auth(redisURL.auth.split(":")[1]);
} else {
  redisClient = redis.createClient();
}

var redisHandler = new rate.Redis.RedisRateHandler({ client: redisClient });
var limiterMiddleware = rate.middleware({ handler: redisHandler, interval: 1, limit: 1 });

function routes(app) {
  app.get('/', function (req, res) {
    if(process.env.HOME_URL) {
      return res.redirect(process.env.HOME_URL);
    }
    res.set('Content-Type', 'text/plain');
    res.send(indexView);
  });

  app.get('/paste', function (req, res) {
    return res.redirect(process.env.PASTE_URL);
  });

  function handleUpload(req, res, next) {
    if(!Buffer.isBuffer(req.body)) {
      return res.status(400).send("Request Body and Content-Type are required");
    }
    Blob.setBlob(req.body, req.get('content-type'), function (err, id) {
      if(err) return next(err);
      res.send('/blobs/' + id);
    });
  }

  app.options('/blobs', cors(app.settings.cors));
  app.post('/blobs', limiterMiddleware, handleUpload);
  app.put('/blobs', limiterMiddleware, handleUpload);

  app.get('/blobs/:uuid', function (req, res, next) {
    Blob.getBlob(req.params.uuid, function (err, data, type) {
      if(err) return next(err);
      if(data == null) return res.sendStatus(404);

      // set the content type giving priority to the query string,
      // then to the content type of the stored data, and defaulting to
      // text/plain
      type = req.query.type || type || 'text/plain';
      res.set('Content-Type', type);

      // send the uuid of this object as a hack around XHR's stupid
      // limitations around redirects
      res.set('Immutio-Blob-Id', req.params.uuid);

      res.send(data);
    });
  });
}

module.exports = routes;
