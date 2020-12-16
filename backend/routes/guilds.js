const { validateGuild } = require('../models/guild');
const express = require('express');
const router = express.Router();
const { gameOver } = require('../db/utils/gameOver');

router.get('/', async (req, res) => {
  const Guild = res.locals.models.guild;
  const guild = await Guild.find();
  res.send(guild);
});

router.get('/:id', async (req, res) => {
  const Guild = res.locals.models.guild;
  const guild = await Guild.findById(req.params.id);
  if (!guild) res.status(404).send(`Guild with id ${req.params.id} not found`);
  res.send(guild);
});

router.post('/', async (req, res) => {
  const Guild = res.locals.models.guild;
  const { error } = validateGuild(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let guild = await Guild.findOne({
    name: req.body.name,
  });
  if (guild) return res.status(400).send('Guild with this name already registered.');

  guild = new Guild(req.body);
  await guild.save();
  res.send(guild);
});

router.put('/:id/members', async (req, res) => {
  const Guild = res.locals.models.guild;

  let guild = await Guild.findById(req.params.id);
  if (!guild) return res.status(404).send('The guild with given ID was not found');

  const membersArray = guild.members;
  let memberExist = membersArray.includes(req.body.member);
  if (memberExist) return res.status(404).send('The member with given ID already exist');
  else membersArray.push(req.body.member);

  guild = await Guild.findByIdAndUpdate(
    req.params.id,
    {
      members: membersArray,
    },
    {
      new: true,
    },
  );

  res.send(guild);
});

module.exports = router;
