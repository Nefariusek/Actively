const { validateInventory } = require('../models/inventory');
const { validateItemID } = require('../models/item');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const Inventory = res.locals.models.inventory;

  const { error } = validateInventory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let inventory = new Inventory(req.body);
  await inventory.save();
  res.send(inventory);
});

router.get('/:id', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const inventory = await Inventory.findById(req.params.id).catch((err) => {
    console.error(`Bad request. The given ID: ${req.params.id} was not valid. ${err}`);
    return null;
  });
  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

router.put('/:id/gold', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const { error } = validateInventory(req.body.inventory);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.inventory == null || req.body.inventory.gold == null)
    return res.status(400).send('Bad request: none inventory/gold value in request body.');

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      gold: req.body.inventory.gold,
    },
    { new: true },
  );
  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

module.exports = router;
