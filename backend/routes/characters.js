const express = require('express');
const router = express.Router();
const { validateCharacter } = require('../models/character');
const { getStatsOnLevelUp } = require('../db/utils/getStatsOnLevelUp');
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

//[working]
router.put('/:id/health', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      if (req.body.health > 0) {
        Character.findByIdAndUpdate(
          req.params.id,
          {
            health: req.body.health,
          },
          {
            new: true,
          },
        ).then(
          (r) => {
            res.send('Health updated!');
          },
          (err) => {
            res.status(403).send('Bad request!');
          },
        );
      } else {
        gameOver(Character, result);
      }
    }
  });
});

//[working]
router.put('/:id/endurance', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      if (req.body.endurance > 0) {
        Character.findByIdAndUpdate(
          req.params.id,
          {
            endurance: req.body.endurance,
          },
          {
            new: true,
          },
        ).then(
          (r) => {
            res.send('Endurance updated!');
          },
          (err) => {
            res.status(403).send('Bad request!');
          },
        );
      } else {
        gameOver(Character, result);
      }
    }
  });
});

router.put('/:id/strength', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          strength: req.body.strength,
        },
        {
          new: true,
        },
      ).then(
        (r) => {
          res.send('strengthupdated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

router.put('/:id/max_health', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          max_health: req.body.max_health,
        },
        {
          new: true,
        },
      ).then(
        (r) => {
          res.send('strengthupdated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

router.put('/:id/dexterity', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          dexterity: req.body.dexterity,
        },
        {
          new: true,
        },
      ).then(
        (r) => {
          res.send('Dexterity updated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

router.put('/:id/physical_power', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          physical_power: req.body.physical_power,
        },
        {
          new: true,
        },
      ).then(
        (r) => {
          res.send('Physical power updated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

router.put('/:id/experience_points', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          experience_points: req.body.experience_points,
        },
        {
          new: true,
        },
      ).then(
        async (r) => {
          console.log(r);
          if (r.experience_points >= r.experience_required) {
            let stats = [0, 0, 0, 0];
            let nextLevel = r.level;
            let reqExp = r.experience_required;
            while (r.experience_points > reqExp) {
              nextLevel++;
              stats = getStatsOnLevelUp(result, nextLevel);
              reqExp = stats[1];
            }

            await Character.findByIdAndUpdate(req.params.id, {
              level: nextLevel,
              health: stats[0],
              max_health: stats[0],
              experience_required: stats[1],
              strength: stats[2],
              dexterity: stats[3],
            });
          }
          res.send('Experience points updated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

async function getCharacters(Character, id) {
  if (id) {
    return await Character.find({
      _id: id,
    }).then(
      (result) => {
        return result[0];
      },
      (err) => console.log('Error', err),
    );
  } else {
    return await Character.find().then(
      (result) => {
        return result;
      },
      (err) => console.log('Error', err),
    );
  }
}

module.exports = router;
