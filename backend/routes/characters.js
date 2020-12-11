const express = require('express');
const router = express.Router();
const { validateCharacter } = require('../models/character');
//const { getStatsOnLevelUp } = require('../db/utils/getStatsOnLevelUp');
//const { gameOver } = require('../db/utils/gameOver');

//Creating new character [working]
router.post('/', async (req, res) => {
  const Character = res.locals.models.character;

  const { error } = validateCharacter(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let character = new Character(req.body);
  await character.save();
  res.send(character);
});

router.get('/', async (req, res) => {
  const Character = res.locals.models.character;
  const character = await Character.find().sort('name');
  res.send(character);
});

//Searching character by ID [working]
router.get('/:id', async (req, res) => {
  const Character = res.locals.models.character;

  const character = await Character.findById(req.params.id);
  if (!character) res.status(404).send(`Character with id ${req.params.id} not found`);
  res.send(character);
});

module.exports = router;
