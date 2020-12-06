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

const createItems = async (amount, models) => {
  const itemData = arrayWithCount(amount)((x) => {
    if (defaultItems[x] !== undefined) {
      return defaultItems[x];
    } else {
      return {
        name: 'Initializer Sword',
        slot: 'Weapon',
        description: 'Ordinary sword',
        effect: 'Adds strength',
        effect_value: 10,
        price: 300,
      };
    }
  });

  return await createModelBatch(models.item, itemData);
};

const createInventories = async (amount, models, idCatalog) => {
  const inventoryData = arrayWithCount(amount)((x) => {
    return {
      equippedItems: [],
      backpack: [],
      gold: 150,
    };
  });

  return await createModelBatch(models.inventory, inventoryData);
};

const createStatistics = async (amount, models, idCatalog) => {
  const statisticsData = arrayWithCount(amount)((x) => {
    return {
      quests_completed: 0,
      streak: 3,
    };
  });

  return await createModelBatch(models.statistics, statisticsData);
};

const createQuests = async (amount, models) => {
  const questData = arrayWithCount(amount)((x) => {
    if (defaultQuests[x] !== undefined) {
      return defaultQuests[x];
    } else {
      return {
        name: 'Initializer',
        description: 'Run for 100 minutes.',
        type: 'Activity',
        duration: 24,
        experience_reward: 300,
        gold_reward: 200,
        penalty: 100,
      };
    }
  });

  return await createModelBatch(models.quest, questData);
};

const createQuestbooks = async (amount, models, idCatalog) => {
  const questbookData = arrayWithCount(amount)((x) => {
    return {
      quests: [],
    };
  });

  return await createModelBatch(models.questbook, questbookData);
};

const createGuilds = async (amount, models, idCatalog) => {
  const guildData = arrayWithCount(amount)((x) => {
    return {
      name: 'Initializers',
      leader: null,
      members: [],
    };
  });

  return await createModelBatch(models.guild, guildData);
};

const createSocials = async (amount, models, idCatalog) => {
  const socialData = arrayWithCount(amount)((x) => {
    return {
      main_guild: null,
      guilds: [],
    };
  });

  return await createModelBatch(models.social, socialData);
};

const createCharacters = async (
  amount,
  models,
  inventoryCatalog,
  statisticsCatalog,
  questbookCatalog,
  socialCatalog,
) => {
  const characterData = arrayWithCount(amount)((x) => {
    return {
      name: 'Administrator',
      species: 'Warrior',
      level: 3,
      experience_points: 23,
      experience_required: 100,
      health: 44,
      max_health: 50,
      endurance: 100,
      max_endurance: 100,
      strength: 12,
      dexterity: 6,
      wisdom: 3,
      inventory_id: inventoryCatalog[x] === undefined ? null : inventoryCatalog[x],
      statistics_id: statisticsCatalog[x] === undefined ? null : statisticsCatalog[x],
      questbook_id: questbookCatalog[x] === undefined ? null : questbookCatalog[x],
      social_id: socialCatalog[x] === undefined ? null : socialCatalog[x],
    };
  });

  return await createModelBatch(models.character, characterData);
};

const createUsers = async (amount, models, characterCatalog) => {
  const userData = arrayWithCount(amount)((x) => {
    return {
      username: 'ActivelyAdmin',
      email: `activelyadmin@mail.com`,
      password: 'silne_haslo',
      character_id: characterCatalog[x] === undefined ? null : characterCatalog[x],
    };
  });

  return await createModelBatch(models.user, userData);
};

const itemsInitializer = async (models, idCatalog) => {
  return await createItems(defaultItems.length, models);
};

const inventoriesInitializer = async (models, idCatalog) => {
  return await createInventories(1, models);
};

const statisticsInitializer = async (models, idCatalog) => {
  return await createStatistics(1, models);
};

const questsInitializer = async (models, idCatalog) => {
  return await createQuests(defaultQuests.length, models);
};

const questbooksInitializer = async (models, idCatalog) => {
  return await createQuestbooks(1, models);
};

const guildsInitializer = async (models, idCatalog) => {
  return await createGuilds(1, models);
};

const socialsInitializer = async (models, idCatalog) => {
  return await createSocials(1, models, idCatalog['guild']);
};

const charactersInitializer = async (models, idCatalog) => {
  return await createCharacters(
    1,
    models,
    idCatalog['inventory'],
    idCatalog['statistics'],
    idCatalog['questbook'],
    idCatalog['social'],
  );
};

const usersInitializer = async (models, idCatalog) => {
  return await createUsers(1, models, idCatalog['character']);
};

const defaultInitializers = new Map([
  ['item', itemsInitializer],
  ['inventory', inventoriesInitializer],
  ['statistics', statisticsInitializer],
  ['quest', questsInitializer],
  ['questbook', questbooksInitializer],
  ['guild', guildsInitializer],
  ['social', socialsInitializer],
  ['character', charactersInitializer],
  ['user', usersInitializer],
]);

const initializationOrder = [
  'item',
  'inventory',
  'statistics',
  'quest',
  'questbook',
  // 'guild',
  'social',
  'character',
  'user',
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
