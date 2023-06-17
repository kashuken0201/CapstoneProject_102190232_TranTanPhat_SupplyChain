"use strict";

import network from "./network.fabric.js";

const chaincode = process.env.CHAINCODE_NAME;
const orgName = "retailer";

const orderProduct = async (
    retailerId,
    productId,
    orderedDate,
    status,
    hashCode
) => {
    const networkObj = await network.connect(orgName, retailerId, chaincode);
    await network.invoke(
        networkObj,
        "OrderProduct",
        retailerId,
        productId,
        orderedDate,
        status,
        hashCode
    );
};

const receiveProduct = async (
    retailerId,
    productId,
    receivedDate,
    status,
    hashCode
) => {
    const networkObj = await network.connect(orgName, retailerId, chaincode);
    await network.invoke(
        networkObj,
        "ReceiveProduct",
        productId,
        receivedDate,
        status,
        hashCode
    );
};

const sellProduct = async (
    retailerId,
    productId,
    soldDate,
    status,
    hashCode
) => {
    const networkObj = await network.connect(orgName, retailerId, chaincode);
    await network.invoke(
        networkObj,
        "SellProduct",
        productId,
        soldDate,
        status,
        hashCode
    );
};

export default {
    orderProduct,
    receiveProduct,
    sellProduct,
};
