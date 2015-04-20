function settings(app) {
  app.settings = app.settings || {};
  app.settings.cors = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'HEAD'],
    exposedHeaders: ['Immutio-Blob-Id', 'Content-Type', 'Content-Length'],
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Content-Length', 'Accept']
  };
}

module.exports = settings;
