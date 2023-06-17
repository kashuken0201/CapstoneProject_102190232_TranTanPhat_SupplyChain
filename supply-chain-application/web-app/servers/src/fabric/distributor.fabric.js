"use strict";

import network from "./network.fabric.js";

const chaincode = process.env.CHAINCODE_NAME;
const orgName = "distributor";

const deliveryProduct = async (
    distributorId,
    productId,
    deliveryDate,
    status,
    hashCode
) => {
    const networkObj = await network.connect(orgName, distributorId, chaincode);
    await network.invoke(
        networkObj,
        "DeliveryProduct",
        distributorId,
        productId,
        deliveryDate,
        status,
        hashCode
    );
};

export default {
    deliveryProduct,
};
