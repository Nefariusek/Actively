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

router.put('/:id/backpack', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const Item = res.locals.models.item;

  if (req.body.item._id == null) return res.status(400).send('Bad request: none item._id value in request body.');

  const { error } = validateItemID(req.body.item);
  if (error) return res.status(400).send(error.details[0].message);

  const item = await Item.findById(req.body.item._id).catch((err) => {
    console.error(`Bad request. The given ID: ${req.body.item._id} was not valid. ${err}`);
    return null;
  });
  if (!item) return res.status(400).send(`Item with given id ${req.body.item._id} was not found`);

  const inventoryHandel = await Inventory.findById(req.params.id, 'backpack', { lean: true }).catch((err) => {
    console.error(`Bad request. The given ID: ${req.params.id} was not valid. ${err}`);
    return null;
  });
  if (inventoryHandel === null)
    return res.status(404).send(`Bad request. The given ID: ${req.params.id} was not valid.`);

  inventoryHandel.backpack.push(req.body.item._id);

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      backpack: inventoryHandel.backpack,
    },
    { new: true },
  ).catch((err) => {
    console.error(`Bad request. The given ID: ${req.params.id} was not valid. ${err}`);
    return null;
  });

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

module.exports = router;
