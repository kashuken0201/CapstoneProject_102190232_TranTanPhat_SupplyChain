"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME
const orgName = "manufacturer"

/**
 * @param {string} manufacturerId 
 * @param {string} productId 
 * @param {string} retailerId 
 * @param {string} distributorId 
 */
const provideProduct = async (manufacturerId, productId, retailerId, distributorId) => {
  const networkObj = await network.connect(orgName, manufacturerId, chaincode)
  await network.invoke(networkObj, "ProvideProduct", manufacturerId, productId, retailerId, distributorId)
}

/**
 * @param {string} manufacturerId 
 * @param {string} productId 
 * @param {string} productName 
 * @param {float} price 
 * @param {string} description 
 * @param {[]string} rawIds 
 */
const updateProduct = async (manufacturerId, productId, productName, price, description, rawIds) => {
  const networkObj = await network.connect(orgName, manufacturerId, chaincode)
  await network.invoke(networkObj, "UpdateProduct", manufacturerId, productId, productName, price, description, rawIds)
}

/**
 * @param {string} manufacturerId 
 * @param {string} productName 
 * @param {float} price 
 * @param {string} description 
 * @param {[]string} rawIds 
 */
const createProduct = async (manufacturerId, productName, price, description, rawIds) => {
  const networkObj = await network.connect(orgName, manufacturerId, chaincode)
  await network.invoke(networkObj, "CreateProduct", manufacturerId, productName, price, description, rawIds)
}

/**
 * @param {string} manufacturerId
 * @param {string} rawId
 * @param {string} supplierId
 */
const orderRaw = async (manufacturerId, rawId, supplierId) => {
  const networkObj = await network.connect(orgName, manufacturerId, chaincode)
  await network.invoke(networkObj, "OrderRaw", manufacturerId, rawId, supplierId)
}

export default {
  createProduct,
  updateProduct,
  provideProduct,
  orderRaw
}
