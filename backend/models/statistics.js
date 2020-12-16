const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const statisticsSchema = new mongoose.Schema({
  quests_completed: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  playing_since: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
});

const validateStatistics = (statistics) => {
  const schema = Joi.object({
    quests_completed: Joi.number().min(0),
    streak: Joi.number(),
    playing_since: Joi.date(),
  });

  return schema.validate(statistics);
};

exports.statistics = statisticsSchema;
exports.validateStatistics = validateStatistics;
