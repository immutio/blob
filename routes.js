var Blob = require('./models/blob');
var fs = require('fs');
var indexView = fs.readFileSync('views/index.md');

function routes(app) {
  app.get('/', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(indexView);
  });

  app.post('/blobs', function (req, res) {
    Blob.setBlob(req.rawBody, function (err, id) {
      if(err) return res.sendStatus(500);
      res.set('Content-Type', 'text/plain');
      res.send(id);
    });
  });

  app.get('/blobs/:uuid', function (req, res) {
    Blob.getBlob(req.params.uuid, function (err, data) {
      if(err) return res.sendStatus(500);
      if(data == null) return res.sendStatus(404);
      res.set('Content-Type', 'text/plain');
      res.send(data);
    });
  });
}

module.exports = routes;
