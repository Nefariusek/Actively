const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 16,
    trim: true,
  },
  class: {
    type: String,
    enum: ['', 'Warrior', 'Hunter', 'Mage'],
    default: '',
  },
  level: {
    type: Number,
    default: 1,
  },
  experience_points: {
    type: Number,
    default: 0,
  },
  experience_required: {
    type: Number,
    default: 0,
  },
  health: {
    type: Number,
    default: 0,
  },
  max_health: {
    type: Number,
    default: 0,
  },
  endurance: {
    type: Number,
    default: 0,
  },
  max_endurance: {
    type: Number,
    default: 0,
  },
  strength: {
    type: Number,
    default: 0,
  },
  dexterity: {
    type: Number,
    default: 0,
  },
  wisdom: {
    type: Number,
    default: 0,
  },
  inventory_id: {
    type: ObjectId,
    required: true,
    ref: 'Inventory',
  },
  statistics_id: {
    type: ObjectId,
    required: true,
    ref: 'Statistics',
  },
  questbook_id: {
    type: ObjectId,
    required: true,
    ref: 'Questbook',
  },
  social_id: {
    type: ObjectId,
    required: true,
    ref: 'Social',
  },
});

const validateCharacter = (character) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(16).trim(),
    species: Joi.valid('Warrior', 'Hunter', 'Mage'),
    level: Joi.number().min(0),
    experience_points: Joi.number().min(0),
    experience_required: Joi.number().min(0),
    health: Joi.number().min(0),
    max_health: Joi.number().min(0),
    endurance: Joi.number().min(0),
    max_endurance: Joi.number().min(0),
    strength: Joi.number().min(0),
    dexterity: Joi.number().min(0),
    wisdom: Joi.number().min(0),
    inventory_id: Joi.objectId().required(),
    statistics_id: Joi.objectId().required(),
    questbook_id: Joi.objectId().required(),
    social_id: Joi.objectId().required(),
  });

  return schema.validate(character);
};

exports.character = characterSchema;
exports.validateCharacter = validateCharacter;
