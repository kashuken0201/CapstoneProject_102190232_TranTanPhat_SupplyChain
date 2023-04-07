"use strict";

import express from "express"
import controller from '../controllers/chaincode.controller';

const router = express.Router()

router.get('/info/:role/:info', controller.getChainInfo);
router.get('/blocks/:role', controller.getBlocks);
router.get('/block-hash/:role/:hash', controller.getBlockByHash);
router.get('/transact/:role/:transactId', controller.getTransactionByID);
router.get('/block-id/:role/:txId', controller.getBlockByTxID);

export default router
