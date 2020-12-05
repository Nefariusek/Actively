const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const inventorySchema = new mongoose.Schema({
  equipped: {
    type: Object,
    ref: 'Item',
    default: [],
  },
  backpack: {
    type: Object,
    ref: 'Item',
    default: [],
  },
  gold: {
    type: Number,
    default: 0,
  },
});

const validateInventory = (inventory) => {
  const schema = Joi.object({
    equippedItems: Joi.array().items(Joi.object),
    backpack: Joi.array().items(Joi.object),
    gold: Joi.number().min(0),
  });

  return schema.validate(inventory);
};

exports.inventory = inventorySchema;
exports.validateInventory = validateInventory;
