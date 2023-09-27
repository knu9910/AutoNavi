const express = require('express');
const router = express.Router({ mergeParams: true });

const carsRouter = require('./cars');
const userRouter = require('./users');
const realCarRouter = require('./realCar');
const historyCarRouter = require('./historyCar');

router.use('/cars', carsRouter);
router.use('/users', userRouter);
router.use('/real', realCarRouter);
router.use('/history', historyCarRouter);

module.exports = router;
