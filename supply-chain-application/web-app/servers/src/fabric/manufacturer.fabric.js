"use strict";

import network from "./network.fabric.js";

const chaincode = process.env.CHAINCODE_NAME;
const orgName = "manufacturer";

const orderRaw = async (manufacturerId, rawId, status, hashCode) => {
    const networkObj = await network.connect(
        orgName,
        manufacturerId,
        chaincode
    );
    await network.invoke(
        networkObj,
        "OrderRaw",
        rawId,
        manufacturerId,
        status,
        hashCode
    );
};

const createProduct = async (
    manufacturerId,
    productId,
    productName,
    price,
    rawIds,
    status,
    description,
    createdDate,
    hashCode
) => {
    const networkObj = await network.connect(
        orgName,
        manufacturerId,
        chaincode
    );
    await network.invoke(
        networkObj,
        "CreateProduct",
        manufacturerId,
        productId,
        productName,
        price,
        rawIds,
        status,
        description,
        createdDate,
        hashCode
    );
};

const updateProduct = async (
    manufacturerId,
    productId,
    productName,
    price,
    rawIds,
    status,
    description,
    hashCode
) => {
    const networkObj = await network.connect(
        orgName,
        manufacturerId,
        chaincode
    );
    await network.invoke(
        networkObj,
        "UpdateProduct",
        productId,
        productName,
        price,
        rawIds,
        status,
        description,
        hashCode
    );
};

const provideProduct = async (
    manufacturerId,
    productId,
    distributorId,
    status,
    hashCode
) => {
    const networkObj = await network.connect(
        orgName,
        manufacturerId,
        chaincode
    );
    await network.invoke(
        networkObj,
        "ProvideProduct",
        manufacturerId,
        productId,
        distributorId,
        status,
        hashCode
    );
};

export default {
    orderRaw,
    createProduct,
    updateProduct,
    provideProduct,
};
