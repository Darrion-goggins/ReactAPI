const express = require('express');
const router = express.Router();

// /api/cars
router.use('/', require('./api/prometheusRoutes'));
// /api/users
// router.use('/users', require('./api/userRoutes'));

module.exports = router;