const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', async (req, res) => {
  validateLogin = (req) => {
    const schema = {
      email: Joi.string().max(255).required().email(),
      password: Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(req, schema);
  };

  const { error, value } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await res.locals.models.user.findOne({ email: value.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  let validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWTPRIVATEKEY,
  );

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
});

module.exports = router;
