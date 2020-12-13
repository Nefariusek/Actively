const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const { validateQuest } = require('../models/quest');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  const Quest = res.locals.models.quest;
  const { error } = validateQuest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let quest = new Quest(req.body);
  await quest.save();

  res.send(quest);
});

router.get('/', async (req, res) => {
  const Quest = res.locals.models.quest;
  const quests = await Quest.find().sort('name');
  res.send(quests);
});

module.exports = router;
