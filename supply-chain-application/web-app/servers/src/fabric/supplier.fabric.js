"use strict";

import network from "./network.fabric.js";

const chaincode = process.env.CHAINCODE_NAME;
const orgName = "supplier";

const createRaw = async (
    supplierId,
    rawId,
    rawName,
    createDate,
    status,
    hashCode
) => {
    const networkObj = await network.connect(orgName, supplierId, chaincode);
    await network.invoke(
        networkObj,
        "CreateRaw",
        supplierId,
        rawId,
        rawName,
        createDate,
        status,
        hashCode
    );
};

const updateRaw = async (supplierId, rawId, rawName, status, hashCode) => {
    const networkObj = await network.connect(orgName, supplierId, chaincode);
    await network.invoke(
        networkObj,
        "UpdateRaw",
        rawId,
        rawName,
        status,
        hashCode
    );
};

const supplyRaw = async (supplierId, rawId, suppliedDate, status, hashCode) => {
    const networkObj = await network.connect(orgName, supplierId, chaincode);
    await network.invoke(
        networkObj,
        "SupplyRaw",
        rawId,
        suppliedDate,
        status,
        hashCode
    );
};

export default {
    createRaw,
    updateRaw,
    supplyRaw,
};
