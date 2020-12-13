const { validateItemEquipped } = require('../models/item');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const Item = res.locals.models.item;
  const items = await Item.find()
    .sort('slot')
    .catch((err) => {
      console.error(`Bad request. ${err}`);
      return null;
    });
  res.send(items);
});

module.exports = router;
