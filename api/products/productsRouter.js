const express = require('express');
const router = express.Router();
const Products = require('./productsModel');
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const { findAll, findBy, update, remove } = require('../globalDbModels');

const TABLE_NAME = 'products';

// retrieve all existing products
router.get('/', authRequired, async (req, res) => {
  try {
    const products = await findAll(TABLE_NAME);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// retrieve a product by the given :id
router.get('/:id', authRequired, validateId(TABLE_NAME), async (req, res) => {
  res.status(200).json(req.product);
});

// create a new product
router.post('/', authRequired, validateBody, async (req, res) => {
  const product = req.body;

  try {
    const created = await Products.create(product);

    res.status(201).json({ message: 'Product created', product: created[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/', authRequired, validateBody, async (req, res) => {
  const changes = req.body;
  const id = changes.id || 0;

  try {
    const product = await findBy(TABLE_NAME, { id });

    if (product) {
      const updated = await update(TABLE_NAME, changes, { id });
      res.status(200).json({ message: 'Product updated', product: updated });
    } else {
      res.status(404).json({ message: 'Could not find the specified product' });
    }
  } catch (err) {
    res.status(500).json({
      message: `Could not update product with ID: ${id}`,
      error: err.message,
    });
  }
});

router.delete(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  async (req, res) => {
    try {
      await remove(TABLE_NAME, { id: req.product.id });

      res.status(200).json({
        message: `Product '${req.product.id}' was deleted.`,
        product: req.product,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
