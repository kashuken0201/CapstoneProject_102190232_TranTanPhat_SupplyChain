"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME

/**
 * @param {string} orgName
 * @param {string} userId 
 * @returns {[]Product}
 */
const getProducts = async (orgName, userId) => {
  if (orgName == "supplier") return "No privilege"
  const networkObj = await network.connect(orgName, userId, chaincode)
  const res = await network.query(networkObj, "GetProducts", userId)
  if (res == null) return "No product"
  return res
}

/**
 * @param {string} orgName
 * @param {string} userId 
 * @param {string} productId 
 * @returns {Product}
 */
const getProduct = async (orgName, userId, productId) => {
  if (orgName == "supplier") return "No privilege"
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "GetProduct", productId)
}

/**
 * @param {string} orgName
 * @param {string} supplierId 
 * @param {string} rawId
 * @returns {Raws}
 */
const getRaw = async (orgName, userId, rawId) => {
  if (orgName == "distributor" && orgName == "supplier") return "No privilege"
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "GetRaw", rawId)
}

/**
* @param {string} orgName
* @param {string} supplierId
* @returns {Raws}
*/
const getRaws = async (orgName, supplierId) => {
  if (orgName == "distributor" || orgName == "retailer") return "No privilege"
  const networkObj = await network.connect(orgName, supplierId, chaincode)
  return await network.query(networkObj, "GetRaws", supplierId)
}

/**
 * @param {string} orgName 
 * @param {string} userId
 * @returns {User}
 */
const getUser = async (orgName, userId) => {
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "GetUser", userId)
}

/**
 * @param {string} orgName 
 * @param {string} adminId 
 * @returns {Users}
 */
const getUsers = async (orgName, adminId) => {
  const networkObj = await network.connect(orgName, adminId, chaincode)
  return await network.query(networkObj, "GetUsers", orgName)
}

/**
 * @param {string} orgName
 * @param {string} userId 
 * @param {string} rawId
 * @returns {RawHistories}
 */
const getRawHistories = async (orgName, userId, rawId) => {
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "GetRawHistories", rawId)
}

/**
 * @param {string} orgName
 * @param {string} userId 
 * @param {string} productId
 * @returns {ProductHistories}
 */
const getProductHistories = async (orgName, userId, productId) => {
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "GetProductHistories", productId)
}

export default {
  getUser,
  getUsers,
  getProduct,
  getProducts,
  getRaw,
  getRaws,
  getRawHistories,
  getProductHistories
};