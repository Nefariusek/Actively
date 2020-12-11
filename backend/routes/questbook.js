const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { validateQuest } = require('../models/quest');
const { validateQuestbook } = require('../models/questbook');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const Questbook = res.locals.models.questbook;

  const { error } = validateQuestbook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let questbook = new Questbook(req.body);
  await questbook.save();
  res.send(questbook);
});

module.exports = router;
