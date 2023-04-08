const chaincodeRouter = require('express').Router();
const controller = require('../controllers/chaincode.js');

chaincodeRouter.get('/info/:role/:info', controller.getChainInfo);
chaincodeRouter.get('/blocks/:role', controller.getBlocks);
chaincodeRouter.get('/block-hash/:role/:hash', controller.getBlockByHash);
chaincodeRouter.get('/transact/:role/:transactId', controller.getTransactionByID);
chaincodeRouter.get('/block-id/:role/:txId', controller.getBlockByTxID);

module.exports = chaincodeRouter;
