const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const questbookSchema = new mongoose.Schema({
  quests: [
    {
      type: Object,
      ref: 'Quest',
      default: [],
    },
  ],
});

function validateQuestbook(questbook) {
  const schema = Joi.object({
    quests: Joi.array().items(Joi.object),
  });

  return schema.validate(questbook);
}

exports.questbook = questbookSchema;
exports.validateQuestbook = validateQuestbook;
