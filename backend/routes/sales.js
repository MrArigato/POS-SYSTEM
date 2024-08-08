const express = require('express');
const Sales = require('../models/Sales');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { product, quantity, total } = req.body;
  const sales = new Sales({ product, quantity, total });
  await sales.save();

  const inventory = await Inventory.findOne({ product });
  if (inventory) {
    inventory.quantity -= quantity;
    await inventory.save();
  }

  res.status(201).send({ message: 'Sale recorded successfully' });
});

router.get('/', auth, async (req, res) => {
  const sales = await Sales.find().populate('product');
  res.send(sales);
});

module.exports = router;
    