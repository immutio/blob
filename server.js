var express = require('express'),
    settings = require('./settings'),
    middleware = require('./middleware'),
    routes = require('./routes'),
    mongoose = require('./mongoose'),
    app = express();

settings(app);
middleware(app);
routes(app);

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Blob listening at http://%s:%s', host, port);
});
