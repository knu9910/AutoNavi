const express = require('express');
const router = express.Router({ mergeParams: true });

const carsRouter = require('./cars');
const userRouter = require('./users');
const realCarRouter = require('./realCar');

router.use('/cars', carsRouter);
router.use('/users', userRouter);
router.use('/real', realCarRouter);

module.exports = router;
