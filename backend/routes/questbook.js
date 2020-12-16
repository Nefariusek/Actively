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

router.get('/:id', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const quests = _.filter(questbook.quests, (quest) => {
    return quest;
  });

  res.send(quests);
});

router.get('/:id/completed', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const quests = _.filter(questbook.quests, (quest) => {
    return quest.status == 'completed';
  });

  res.send(quests);
});

router.get('/:id/uncompleted', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const quests = _.filter(questbook.quests, (quest) => {
    return quest.status == 'in_progress' || quest.status == 'paused';
  });

  res.send(quests);
});

router.get('/:id/failed', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const quests = _.filter(questbook.quests, (quest) => {
    return quest.status == 'failed';
  });

  res.send(quests);
});

router.put('/:id/quest', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const Quest = res.locals.models.quest;
  let quest = new Quest(req.body);
  const { error } = validateQuest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const questbookHandel = await Questbook.findById(req.params.id, 'quests', { lean: true });
  quest['_doc']['creationTime'] = new Date();
  questbookHandel.quests.push(quest);

  const questbook = await Questbook.findByIdAndUpdate(
    req.params.id,
    {
      quests: questbookHandel.quests,
    },
    { new: true },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});

//get all quests
router.get('/:id/quests', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const questbook = await Questbook.findById(req.params.id);

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');

  const quests = _.filter(questbook.quests);

  res.send(quests);
});

router.post('/:id/quest', async (req, res) => {
  const Questbook = res.locals.models.questbook;
  const Quest = res.locals.models.quest;
  let quest = new Quest(req.body);
  const { error } = validateQuest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // await quest.save();
  // console.log(quest);
  const questbookHandel = await Questbook.findById(req.params.id, 'quests', { lean: true });
  questbookHandel.quests.push(quest);

  const questbook = await Questbook.findByIdAndUpdate(
    req.params.id,
    {
      quests: questbookHandel.quests,
    },
    { new: true },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});

//start finish quest
router.put('/:id/quest/:idQuest', async (req, res) => {
  const Questbook = res.locals.models.questbook;

  const questbook = await Questbook.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { 'quests.$[quest].status': req.body.status, 'quests.$[quest].startFinishDate': new Date() } },
    {
      arrayFilters: [
        {
          'quest._id': new mongoose.Types.ObjectId(req.params.idQuest),
        },
      ],
      new: true,
    },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});

//pause quest
router.put('/:id/quest/:idQuest/pause', async (req, res) => {
  const Questbook = res.locals.models.questbook;

  const questbook = await Questbook.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { 'quests.$[quest].status': req.body.status, 'quests.$[quest].pauseDate': new Date() } },
    {
      arrayFilters: [
        {
          'quest._id': new mongoose.Types.ObjectId(req.params.idQuest),
        },
      ],
      new: true,
    },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});

//unpause quest
router.put('/:id/quest/:idQuest/unpause', async (req, res) => {
  const Questbook = res.locals.models.questbook;

  const questbook = await Questbook.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { 'quests.$[quest].status': req.body.status, 'quests.$[quest].pausedAlready': true } },
    {
      arrayFilters: [
        {
          'quest._id': new mongoose.Types.ObjectId(req.params.idQuest),
        },
      ],
      new: true,
    },
  );

  if (!questbook) return res.status(404).send('The questbook with the given ID was not found.');
  res.send(questbook);
});

module.exports = router;
