const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const socialSchema = new mongoose.Schema({
  main_guild: {
    type: ObjectId,
    default: null,
    ref: 'Guild',
  },
  guilds: [
    {
      type: Object,
      ref: 'Guild',
      default: [],
    },
  ],
});

const validateSocial = (social) => {
  const schema = Joi.object({
    main_guild: Joi.objectId(),
    guilds: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(social);
};

exports.social = socialSchema;
exports.validateSocial = validateSocial;
