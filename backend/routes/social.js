const { validateSocial } = require('../models/social');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const Social = res.locals.models.social;

  const { error } = validateSocial(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let social = new Social(req.body);
  await social.save();
  res.send(social);
});

router.get('/:id', async (req, res) => {
  const Social = res.locals.models.social;
  const social = await Social.findById(req.params.id).catch((err) => {
    console.error(`Bad request. The given ID: ${req.params.id} was not valid. ${err}`);
    return null;
  });
  if (!social) return res.status(404).send('The social with the given ID was not found.');
  res.send(social);
});

router.put('/:id/main_guild', async (req, res) => {
  const Social = res.locals.models.social;
  const { error } = validateSocial(req.body.inventory);
  if (error) return res.status(400).send(error.details[0].message);

  const social = await Social.findByIdAndUpdate(
    req.params.id,
    {
      main_guild: req.body.main_guild,
    },
    { new: true },
  );
  if (!social) return res.status(404).send('The social center with the given ID was not found.');
  res.send(social);
});

module.exports = router;
