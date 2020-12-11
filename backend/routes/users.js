const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const router = express.Router();
const { validateUser } = require('../models/user');

router.post('/', async (req, res) => {
  const User = res.locals.models.user;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('This email is already in use.');

  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
});

router.get('/', async (req, res) => {
  const User = res.locals.models.user;
  const user = await User.find().sort('username');
  res.send(user);
});

module.exports = router;
