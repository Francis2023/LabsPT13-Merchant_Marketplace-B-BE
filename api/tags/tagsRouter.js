const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');

const { findAll, findBy, update, remove } = require('../globalDbModels');

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

router.put('/', authRequired, async (req, res) => {
  const changes = req.body;

  if (Object.keys(changes).length > 0) {
    const id = changes.id || 0;
    try {
      const tag = await findBy(TABLE_NAME, { id });

      if (tag) {
        const updated = await update(TABLE_NAME, changes, { id });
        res.status(200).json({ message: 'Tag updated', tag: updated });
      } else {
        res.status(404).json({ message: 'Could not find the specified tag' });
      }
    } catch (err) {
      res.status(500).json({
        message: `Could not update tag with ID: ${id}`,
        error: err.message,
      });
    }
  } else {
    res.status(404).json({ message: 'Tag info is missing' });
  }
});

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

module.exports = router;
