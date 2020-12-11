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

router.get('/me', auth, async (req, res) => {
  const User = res.locals.models.user;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email', 'character_id']));
});

router.get('/:id', async (req, res) => {
  const User = res.locals.models.user;
  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findById(req.params.id);
  }

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.get('/character/:character_id?', async (req, res) => {
  const User = res.locals.models.user;

  const character_idParam = req.params.character_id;

  const searchObj = () => {
    if (character_idParam != 'All')
      return {
        character_id: character_idParam,
      };
    else return;
  };

  const user = await User.find(searchObj()).sort('username');
  if (!user) res.status(404).send(`Guild with type ${req.params.character_id} not found`);

  res.send(_.pick(user[0], ['_id', 'email', 'username']));
});

router.put('/:id/character_id', (req, res) => {
  const User = res.locals.models.user;
  getUsers(User, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`User with this id: ${req.params.id} not found`);
    } else {
      User.findByIdAndUpdate(
        req.params.id,
        {
          character_id: req.body.character_id,
        },
        {
          new: true,
        },
      ).then(
        (r) => {
          res.send('CharID updated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

async function getUsers(User, id) {
  if (id) {
    return await User.find({
      _id: id,
    }).then(
      (result) => {
        return result[0];
      },
      (err) => console.log('Error', err),
    );
  } else {
    return await User.find().then(
      (result) => {
        return result;
      },
      (err) => console.log('Error', err),
    );
  }
}

function filterByValue(user, tags) {
  if (!tags) return user;
  return user.filter((o) => {
    return tags.every((t) => {
      return o.email.concat(o.description, o.type).toLowerCase().includes(t);
    });
  });
}
module.exports = router;
