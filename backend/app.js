const express = require('express');
const db = require('./db');
const helmet = require('helmet');

const main = async () => {
  const app = express();

  const connection = await db.connect();
  //const models = db.load(connection);

  // [WARNING] Uncommenting lines below will drop your current database and initialize default one.
  // if (process.env.NODE_ENV === 'dev') {
  //   await connection.dropDatabase();
  //   await db.initialize(models);
  // }

  db.register(app, connection, models);

  //Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  //Routes

  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
};

main();
