var Blob = require('./models/blob'),
    cors = require('cors'),
    fs = require('fs'),
    indexView = fs.readFileSync('views/index.md');

function routes(app) {
  app.get('/', function (req, res) {
    if(process.env.HOME_URL) {
      return res.redirect(process.env.HOME_URL);
    }
    res.set('Content-Type', 'text/plain');
    res.send(indexView);
  });

  function handleUpload(req, res, next) {
    if(!Buffer.isBuffer(req.body)) {
      return res.status(400).send("Request body is required");
    }
    Blob.setBlob(req.body, req.get('content-type'), function (err, id) {
      if(err) return next(err);
      res.redirect(303, '/blobs/' + id);
    });
  }

  app.options('/blobs', cors(app.settings.cors));
  app.post('/blobs', handleUpload);
  app.put('/blobs', handleUpload);

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
      res.set('immutio-blob-id', req.params.uuid);

      res.send(data);
    });
  });
}

module.exports = routes;
