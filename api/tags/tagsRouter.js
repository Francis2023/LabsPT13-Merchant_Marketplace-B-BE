const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');

const { findAll, update, remove } = require('../globalDbModels');

const TABLE_NAME = 'tags';

router.get('/', authRequired, async (req, res) => {
  try {
    const tags = await findAll(TABLE_NAME);
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Temp
router.get('/products', authRequired, async (req, res) => {
  try {
    const tags = await findAll('products-tags');
    res.status(200).json(tags);
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
    const changes = req.body;

    try {
      const updated = await update(TABLE_NAME, changes, { id: req.tag.id });
      res.status(200).json({ message: 'Tag updated', tag: updated });
    } catch (err) {
      res.status(500).json({
        message: `Could not update tag with ID: ${req.tag.id}`,
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
      await remove(TABLE_NAME, { id: req.tag.id });

      res.status(200).json({
        message: `Tag with ID: '${req.tag.id}' was deleted.`,
        tag: req.tag,
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete tag with ID: ${req.tag.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
