"use strict";

import express from "express"
import userRouter from './user.routes';
import productRouter from './product.routes';
import transactRouter from './transact.routes';
import chaincodeRouter from './chaincode.routes';

const router = express.Router()

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/transact', transactRouter);
router.use('/chaincode', chaincodeRouter);

export default router