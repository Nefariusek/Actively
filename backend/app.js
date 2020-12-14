const express = require('express');
const db = require('./db');
const helmet = require('helmet');

const users = require('./routes/users');
const auth = require('./routes/auth');
const characters = require('./routes/characters');
const item = require('./routes/item');
const guilds = require('./routes/guilds');
const inventory = require('./routes/inventory');
const quests = require('./routes/quests');
const questbook = require('./routes/questbook');
const statistics = require('./routes/statistics');
const social = require('./routes/social');

const main = async () => {
  const app = express();

  const connection = await db.connect();
  const models = db.load(connection);

  // //[WARNING] Uncommenting lines below will drop your current database and initialize default one.
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
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/characters', characters);
  app.use('/api/item', item);
  app.use('/api/inventory', inventory);
  app.use('/api/quests', quests);
  app.use('/api/guilds', guilds);
  app.use('/api/questbook', questbook);
  app.use('/api/statistics', statistics);
  app.use('/api/social', social);

  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
};

main();
