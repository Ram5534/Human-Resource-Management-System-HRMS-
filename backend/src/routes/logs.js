const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const db = require('../db');

router.get('/', auth, async (req, res) => {
  const logs = await db.query('SELECT * FROM logs ORDER BY created_at DESC');
  res.json(logs.rows);
});

module.exports = router;
