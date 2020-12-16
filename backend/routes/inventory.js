const { validateInventory } = require('../models/inventory');
const { validateItem } = require('../models/item');
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
  let item = new Item(req.body);
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inventoryHandel = await Inventory.findById(req.params.id, 'backpack', { lean: true });
  item['_doc']['creationTime'] = new Date();
  inventoryHandel.backpack.push(item);

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      backpack: inventoryHandel.backpack,
    },
    { new: true },
  );

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

router.put('/:id/Body', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const Item = res.locals.models.item;
  let item = new Item(req.body);
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inventoryHandel = await Inventory.findById(req.params.id, 'bodyItem', { lean: true });
  item['_doc']['creationTime'] = new Date();
  inventoryHandel.bodyItem = item;

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      bodyItem: inventoryHandel.bodyItem,
    },
    { new: true },
  );

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

router.put('/:id/Weapon', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const Item = res.locals.models.item;
  let item = new Item(req.body);
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inventoryHandel = await Inventory.findById(req.params.id, 'weaponItem', { lean: true });
  item['_doc']['creationTime'] = new Date();
  inventoryHandel.weaponItem = item;

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      weaponItem: inventoryHandel.weaponItem,
    },
    { new: true },
  );

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

router.put('/:id/Head', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const Item = res.locals.models.item;
  let item = new Item(req.body);
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inventoryHandel = await Inventory.findById(req.params.id, 'headItem', { lean: true });
  item['_doc']['creationTime'] = new Date();
  inventoryHandel.headItem = item;

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      headItem: inventoryHandel.headItem,
    },
    { new: true },
  );

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

router.put('/:id/Boots', async (req, res) => {
  const Inventory = res.locals.models.inventory;
  const Item = res.locals.models.item;
  let item = new Item(req.body);
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const inventoryHandel = await Inventory.findById(req.params.id, 'legsItem', { lean: true });
  item['_doc']['creationTime'] = new Date();
  inventoryHandel.legsItem = item;

  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      legsItem: inventoryHandel.legsItem,
    },
    { new: true },
  );

  if (!inventory) return res.status(404).send('The inventory with the given ID was not found.');
  res.send(inventory);
});

module.exports = router;
