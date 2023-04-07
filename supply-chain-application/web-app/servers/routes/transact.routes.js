"use strict";

import express from "express"
import controller from '../controllers/transact.controller';

const router = express.Router()

router.get('/:role/:id', controller.getAllTransact),
router.post('/order/:productId', controller.transactProductOrder),
router.post('/sell/:productId', controller.transactProductSell);
router.post('/deliver/:productId', controller.transactProductDeliver);

export default router;
