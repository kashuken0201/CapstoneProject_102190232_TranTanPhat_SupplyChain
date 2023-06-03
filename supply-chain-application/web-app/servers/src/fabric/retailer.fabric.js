"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME
const orgName = "retailer"

/**
 * 
 * @param {string} retailerId 
 * @param {string} productId 
 * @param {string} manufacturerId 
 */
const orderProduct = async (retailerId, productId, manufacturerId) => {
  const networkObj = await network.connect(orgName, retailerId, chaincode)
  await network.invoke(networkObj, "OrderProduct", retailerId, productId, manufacturerId)
}

/**
 * 
 * @param {string} retailerId 
 * @param {string} productId 
 * @param {string} manufacturerId 
 * @param {string} distributorId 
 */
const receiveProduct = async (retailerId, productId, manufacturerId, distributorId) => {
  const networkObj = await network.connect(orgName, retailerId, chaincode)
  await network.invoke(networkObj, "ReceiveProduct", retailerId, productId, manufacturerId, distributorId)
}

/**
 * 
 * @param {string} retailerId 
 * @param {string} productId 
 */
const sellProduct = async (retailerId, productId) => {
  const networkObj = await network.connect(orgName, retailerId, chaincode)
  await network.invoke(networkObj, "SellProduct", retailerId, productId)
}

export default {
  orderProduct,
  receiveProduct,
  sellProduct
}
