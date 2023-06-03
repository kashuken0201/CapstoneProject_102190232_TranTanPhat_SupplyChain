"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME
const orgName = "supplier"

/**
 * @param {string} supplierId 
 * @param {string} rawName 
 */
const createRaw = async (supplierId, rawName) => {
  const networkObj = await network.connect(orgName, supplierId, chaincode)
  await network.invoke(networkObj, "CreateRaw", supplierId, rawName)
}

/**
 * @param {string} supplierId 
 * @param {string} rawId 
 * @param {string} rawName
 */
const updateRaw = async (supplierId, rawId, rawName) => {
  const networkObj = await network.connect(orgName, supplierId, chaincode)
  await network.invoke(networkObj, "UpdateRaw", supplierId, rawId, rawName)
}

/**
 * @param {string} supplierId 
 * @param {string} rawId
 * @param {string} manufacturerId
 */
const supplyRaw = async (supplierId, rawId, manufacturerId) => {
  const networkObj = await network.connect(orgName, supplierId, chaincode)
  await network.invoke(networkObj, "SupplyRaw", supplierId, rawId, manufacturerId)
}


export default {
  createRaw,
  updateRaw,
  supplyRaw
}