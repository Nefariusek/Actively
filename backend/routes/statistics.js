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

module.exports = router;
