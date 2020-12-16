const { validateStatistics } = require('../models/statistics');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const Statistics = res.locals.models.statistics;

  const { error } = validateStatistics(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let statistics = new Statistics(req.body);
  await statistics.save();
  res.send(statistics);
});

router.get('/:id', async (req, res) => {
  const Statistics = res.locals.models.statistics;
  const statistics = await Statistics.findById(req.params.id).catch((err) => {
    console.error(`Bad request. The given ID: ${req.params.id} was not valid. ${err}`);
    return null;
  });
  if (!statistics) return res.status(404).send('The statistics with the given ID was not found.');
  res.send(statistics);
});

router.put('/:id/quests_completed', async (req, res) => {
  const Statistics = res.locals.models.statistics;
  let temp = await Statistics.findById(req.params.id);
  let value = temp.quests_completed + 1;
  let stats = await Statistics.findByIdAndUpdate(
    req.params.id,
    {
      quests_completed: value,
    },
    {
      new: true,
    },
  );

  if (!stats) return res.status(404).send(`Statistics with id ${req.params.id} was not found.`);

  res.send('quests_completed incremented');
});

module.exports = router;
