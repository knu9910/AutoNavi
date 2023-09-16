const express = require('express');
const router = express.Router({ mergeParams: true });

const carRouter = require('./cars');
const userRouter = require('./users');

router.use('/cars', carRouter);
router.use('/users', userRouter);

module.exports = router;
