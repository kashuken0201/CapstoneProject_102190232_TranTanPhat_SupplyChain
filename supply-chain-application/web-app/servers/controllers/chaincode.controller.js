"use strict";

import model from '../models/chaincode.model';

const getChainInfo = async (req, res) => {
    const { info, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.getChainInfo(true, false, info);
    } else if (role === 'consumer') {
        modelRes = await model.getChainInfo(false, true, info);
    }
    res.send(modelRes);
};

const getBlocks = async (req, res) => {
    const { role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.getBlocks(true, false);
    } else if (role === 'consumer') {
        modelRes = await model.getBlocks(false, true);
    }
    res.send(modelRes);
};

const getBlockByHash = async (req, res) => {
    const { hash, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.getBlockByHash(true, false, hash);
    } else if (role === 'consumer') {
        modelRes = await model.getBlockByHash(false, true, hash);
    }
    res.send(modelRes);
};

const getTransactionByID = async (req, res) => {
    const { id, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.getTransactionByID(true, false, id);
    } else if (role === 'consumer') {
        modelRes = await model.getTransactionByID(false, true, id);
    }
    res.send(modelRes);
};

const getBlockByTxID = async (req, res) => {
    const { txId, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.getBlockByTxID(true, false, txId);
    } else if (role === 'consumer') {
        modelRes = await model.getBlockByTxID(false, true, txId);
    }
    res.send(modelRes);
};


export default {
    getBlockByHash,
    getBlockByTxID,
    getBlocks,
    getChainInfo,
    getTransactionByID
}