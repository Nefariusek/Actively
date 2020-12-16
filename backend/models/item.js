const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  slot: {
    type: String,
    enum: ['', 'Weapon', 'Head', 'Body', 'Boots', 'Consumable'],
    require: true,
  },
  description: {
    type: String,
    default: '',
    maxlength: 300,
  },
  effect: {
    type: String,
    default: '',
  },
  effect_value: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  picture: {
    type: String,
    default: '',
  },
});

const validateItem = (item) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    slot: Joi.valid('Weapon', 'Head', 'Body', 'Boots', 'Consumable').required(),
    description: Joi.string().max(300),
    effect: Joi.string(),
    effect_value: Joi.number(),
    price: Joi.number(),
    picture: Joi.string(),
  });

  return schema.validate(item);
};

function validateItemID(item) {
  const schema = Joi.object({
    _id: Joi.objectId(),
  });
  return schema.validate(item);
}
function validateItemEquipped(item) {
  const schema = Joi.object({
    equipped: Joi.boolean(),
  });
  return schema.validate(item);
}

// exports.Item = Item;
exports.item = itemSchema;
exports.validateItem = validateItem;
exports.validateItemID = validateItemID;
exports.validateItemEquipped = validateItemEquipped;
