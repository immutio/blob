var Blob = require('./models/blob');
var fs = require('fs');
var indexView = fs.readFileSync('views/index.md');

function routes(app) {
  app.get('/', function (req, res) {
    if(process.env.HOME_URL) {
      return res.redirect(process.env.HOME_URL);
    }
    res.set('Content-Type', 'text/plain');
    res.send(indexView);
  });

  app.post('/blobs', function (req, res, next) {
    if(!Buffer.isBuffer(req.body)) {
      return res.status(400).send("Request body is required");
    }
    Blob.setBlob(req.body, function (err, id) {
      if(err) return next(err);
      res.redirect(303, '/blobs/' + id);
    });
  });

  app.get('/blobs/:uuid', function (req, res, next) {
    Blob.getBlob(req.params.uuid, function (err, data) {
      if(err) return next(err);
      if(data == null) return res.sendStatus(404);

      var type = req.query.type || 'text/plain';
      res.set('Content-Type', type);
      res.send(data);
    });
  });
}

module.exports = routes;
