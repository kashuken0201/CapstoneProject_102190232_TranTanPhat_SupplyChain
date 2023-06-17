"use strict";

import network from "./network.fabric.js";

const chaincode = process.env.CHAINCODE_NAME;

const getRaw = async (orgName, userId, rawId) => {
    const networkObj = await network.connect(orgName, userId, chaincode);
    return await network.query(networkObj, "GetRaw", rawId);
};

const getRaws = async (orgName, supplierId) => {
    if (orgName == "distributor" || orgName == "retailer")
        return "No privilege";
    const networkObj = await network.connect(orgName, supplierId, chaincode);
    return await network.query(networkObj, "GetRaws", supplierId);
};

const getRawHistories = async (orgName, userId, rawId) => {
    const networkObj = await network.connect(orgName, userId, chaincode);
    return await network.query(networkObj, "GetRawHistories", rawId);
};

const getProduct = async (orgName, userId, productId) => {
    const networkObj = await network.connect(orgName, userId, chaincode);
    return await network.query(networkObj, "GetProduct", productId);
};

const getProducts = async (orgName, userId) => {
    const networkObj = await network.connect(orgName, userId, chaincode);
    const res = await network.query(networkObj, "GetProducts", userId);
    if (res == null) return "No product";
    return res;
};

const getProductHistories = async (orgName, userId, productId) => {
    const networkObj = await network.connect(orgName, userId, chaincode);
    return await network.query(networkObj, "GetProductHistories", productId);
};

export default {
    getRaw,
    getRaws,
    getRawHistories,
    getProduct,
    getProducts,
    getProductHistories,
};
