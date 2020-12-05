const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const questSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    default: '',
    maxlength: 420,
  },
  type: {
    type: String,
    //enum: [daily, monthly etc.],
    //default: ''
  },
  duration: {
    type: Number,
    default: 0,
  },
  experience_reward: {
    type: Number,
    default: 0,
  },
  gold_reward: {
    type: Number,
    default: 0,
  },
  penalty: {
    type: Number,
    default: 0,
  },
});

const validateQuest = (quest) => {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    description: Joi.string().max(420),
    type: Joi.string(), //.valid()
    duration: Joi.number().min(0),
    experience_reward: Joi.number().min(0),
    gold_reward: Joi.number().min(0),
    penalty: Joi.number().min(0),
  });

  return schema.validate(quest);
};

exports.quest = questSchema;
exports.validateQuest = validateQuest;
