const express = require('express');
const router = express.Router();
const Products = require('./productsModel');
const Tags = require('../tags/tagsModel');
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const removeObjKeys = require('../../helpers/removeObjKeys');
const { findAll, update, remove } = require('../globalDbModels');

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
  const tags = req.body.tags.split(',');
  const product = removeObjKeys(req.body, ['tags']);

  try {
    const created = await Products.create(product);
    // insert all the tags under the inserted product
    await Tags.create(tags, created.id);

    res.status(201).json({ message: 'Product created', product: created[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  validateBody,
  async (req, res) => {
    const changes = { ...req.body, updated_at: new Date().toISOString() };

    try {
      const updated = await update(TABLE_NAME, changes, { id: req.product.id });
      res.status(200).json({ message: 'Product updated', product: updated });
    } catch (err) {
      res.status(500).json({
        message: `Could not update product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

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
