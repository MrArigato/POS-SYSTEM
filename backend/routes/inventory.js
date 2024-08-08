const express = require('express');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const inventory = new Inventory(req.body);
  await inventory.save();
  res.status(201).send({ message: 'Inventory created successfully' });
});

router.get('/', auth, async (req, res) => {
  const inventory = await Inventory.find().populate('product');
  res.send(inventory);
});

router.put('/:id', auth, async (req, res) => {
  await Inventory.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: 'Inventory updated successfully' });
});

router.delete('/:id', auth, async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.send({ message: 'Inventory deleted successfully' });
});

module.exports = router;
