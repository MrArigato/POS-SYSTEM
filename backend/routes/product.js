const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send({ message: 'Product created successfully' });
});

router.get('/', auth, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.put('/:id', auth, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: 'Product updated successfully' });
});

router.delete('/:id', auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ message: 'Product deleted successfully' });
});

module.exports = router;
