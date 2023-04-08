const router = require('express').Router();

const userRouter = require('./user.js');
const productRouter = require('./product.js');
const transactRouter = require('./transact.js');
const chaincodeRouter = require('./chaincode.js');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/transact', transactRouter);
router.use('/chaincode', chaincodeRouter);

module.exports = router;