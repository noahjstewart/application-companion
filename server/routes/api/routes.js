const express = require('express');
const router = express.Router();

const applicationRoutes = require('./applications');
// const userRoutes = require('./users');

router.use('/applications', applicationRoutes);
// router.use('/users', userRoutes);

module.exports = router;