const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 16,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
    trim: true,
  },
  character_id: {
    type: ObjectId,
    default: null,
    ref: 'Character',
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required().min(6).max(16).trim(),
    email: Joi.string().required().max(255).trim(),
    password: Joi.string().required().min(8).max(1024).trim(),
    character_id: Joi.objectId(),
  });

  return schema.validate(user);
};

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWTPRIVATEKEY,
  );
  return token;
};

exports.user = userSchema;
exports.validateUser = validateUser;
