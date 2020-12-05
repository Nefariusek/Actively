const { user } = require('../models/user');
const { character } = require('../models/character');
const { questbook } = require('../models/questbook');
const { quest } = require('../models/quest');
const { social } = require('../models/social');
const { guild } = require('../models/guild');
const { statistics } = require('../models/statistics');
const { inventory } = require('../models/inventory');
const { item } = require('../models/item');

module.exports = {
  user,
  character,
  questbook,
  quest,
  social,
  guild,
  statistics,
  inventory,
  item,
};
