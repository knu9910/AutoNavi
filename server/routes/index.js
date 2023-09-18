const express = require('express');
const router = express.Router({ mergeParams: true });

const carsRouter = require('./cars');
const userRouter = require('./users');

router.use('/cars', carsRouter);
router.use('/users', userRouter);

module.exports = router;
