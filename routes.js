var Blob = require('./models/blob'),
    cors = require('cors'),
    fs = require('fs'),
    indexView = fs.readFileSync('views/index.md'),
    rateLimit = require('./middleware/rate-limit');

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

  app.get('/sh', function (req, res) {
    return res.redirect(process.env.SH_URL);
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
  app.post('/blobs', rateLimit, handleUpload);
  app.put('/blobs', rateLimit, handleUpload);

  app.get('/blobs/:uuid', function (req, res, next) {
    Blob.getBlob(req.params.uuid, function (err, dataStream, type, length) {
      if(err) return next(err);
      if(dataStream == null) return res.sendStatus(404);

      dataStream.on('error', function (err) {
        next(err);
      });

      // set the content type giving priority to the query string,
      // then to the content type of the stored data, and defaulting to
      // text/plain
      type = req.query.type || type || 'text/plain';
      res.set('Content-Type', type);
      res.set('Content-Length', length);

      // send the uuid of this object
      res.set('Immutio-Blob-Id', req.params.uuid);

      // set cache control to 1 year in the future
      // https://developer.yahoo.com/performance/rules.html#expires
      res.cacheControl({ maxAge: 31536000 });

      // stream to the client
      dataStream.pipe(res);
    });
  });
}

module.exports = routes;
