const express = require('express');
const router = express.Router();

const Application = require('../../models/application');

router.get('/', (req, res) => {
  res.json({
    array: [1]
  });
});

module.exports = router;