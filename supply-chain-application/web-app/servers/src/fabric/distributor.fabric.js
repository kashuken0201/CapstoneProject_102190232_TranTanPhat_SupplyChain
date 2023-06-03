"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME
const orgName = "distributor"

/**
 * @param {string} distributorId 
 * @param {string} productId 
 * @param {string} manufacturerId 
 * @param {string} retailerId 
 */
const deliveryProduct = async (distributorId, productId, manufacturerId, retailerId) => {
    const networkObj = await network.connect(orgName, distributorId, chaincode)
    await network.invoke(networkObj, "DeliveryProduct", distributorId, productId, manufacturerId, retailerId)
}

export default {
    deliveryProduct
}