function settings(app) {
  app.settings = app.settings || {};
  app.settings.cors = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'HEAD'],
    exposedHeaders: ['immutio-blob-id']
  };
}

module.exports = settings;
