const register = (app, db, models) => {
  console.log('[MongoDB] Connection and models registered in App');
  app.use((req, res, next) => {
    res.locals.models = models;
    res.locals.db = db;
    next();
  });
  return app;
};

module.exports = register;
