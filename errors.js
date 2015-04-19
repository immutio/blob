function errors(app) {
  app.use(function (err, req, res, next) {
    console.error("Error encountered.");
    console.error(err);
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.sendStatus(500);
  });
}

module.exports = errors;
