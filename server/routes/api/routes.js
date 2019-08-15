const express = require('express');
const router = express.Router();

const applicationRoutes = require('./applications');

router.use('/applications', applicationRoutes);

module.exports = router;