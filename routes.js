var Blob = require('./models/blob');

function routes(app) {
  app.get('/', function (req, res) {
    res.send("hello");
  });

  app.post('/blobs', function (req, res) {
    Blob.setBlob(req.rawBody, function (err, id) {
      if(err) return res.status(500).end();
      res.send(id);
    });
  });

  app.get('/blobs/:uuid', function (req, res) {
    Blob.getBlob(req.params.uuid, function (err, data) {
      if(err) return res.status(500).end();
      res.send(data);
    });
  });
}

module.exports = routes;
