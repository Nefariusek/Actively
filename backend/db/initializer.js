const bcrypt = require('bcryptjs');
const _ = require('lodash');

const defaultItems = require('./defaultObjects/defaultItems');
const defaultQuests = require('./defaultObjects/defaultQuests');

const transactional = (initializer) => async (model, models, idCatalog) => {
  let result;
  const session = await model.startSession();
  await session.withTransaction(async () => {
    result = await initializer(models, idCatalog);
  });

  return result;
};

const hashPassword = async (password) => await bcrypt.hash(password, await bcrypt.genSalt());

const createModelBatch = async (model, data) => {
  const createdDocuments = [];
  for (let modelData of data) {
    const createdDocument = new model(modelData);
    createdDocuments.push(createdDocument);
    await createdDocument.save();
  }
  const idArray = [];
  createdDocuments.forEach((element) => {
    idArray.push(element._id);
  });

  return idArray;
};

const arrayWithCount = (count) => (func) => [...Array(count).keys()].map(func);

const itemsInitializer = async (models, idCatalog) => {
  return await createItems();
};

const inventoriesInitializer = async (models, idCatalog) => {
  return await createInventories();
};

const statisticsInitializer = async (models, idCatalog) => {
  return await createStatistics();
};

const questsInitializer = async (models, idCatalog) => {
  return await createQuests();
};

const questbooksInitializer = async (models, idCatalog) => {
  return await createQuestbooks();
};

const guildsInitializer = async (models, idCatalog) => {
  return await createGuilds();
};

const socialsInitializer = async (models, idCatalog) => {
  return await createSocials();
};

const charactersInitializer = async (models, idCatalog) => {
  return await createCharacters();
};

const usersInitializer = async (models, idCatalog) => {
  return await createUsers();
};

const defaultInitializers = new Map([
  ['items', itemsInitializer],
  ['inventories', inventoriesInitializer],
  ['statistics', statisticsInitializer],
  ['quests', questsInitializer],
  ['questbooks', questbooksInitializer],
  ['guilds', guildsInitializer],
  ['socials', socialsInitializer],
  ['characters', charactersInitializer],
  ['users', usersInitializer],
]);

const initializationOrder = [
  'items',
  'inventories',
  'quest',
  'statistics',
  'quests',
  'questbooks',
  'guilds',
  'socials',
  'characters',
  'users',
];

const initialize = async (models, initializers = defaultInitializers) => {
  let idCatalog = [];
  for (let modelName of initializationOrder) {
    if (!initializers.has(modelName)) {
      console.log(`[MongoDB] Initializer for ${modelName} not found.`);
      continue;
    }
    console.log(`[MongoDB] Initializing ${modelName}`);
    const initializer = initializers.get(modelName);
    idCatalog[modelName] = await transactional(initializer)(models[modelName], models, idCatalog);
  }
};

module.exports = initialize;
