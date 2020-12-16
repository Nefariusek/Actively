const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const guildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  leader: {
    type: ObjectId,
    ref: 'Character',
  },
  members: {
    type: [ObjectId],
    default: [],
  },
});

const validateGuild = (guild) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    description: Joi.string().max(255),
    leader: Joi.objectId(),
    members: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(guild);
};

exports.guild = guildSchema;
exports.validateGuild = validateGuild;
