const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

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
