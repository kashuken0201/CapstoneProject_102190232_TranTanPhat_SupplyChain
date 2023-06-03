"use strict"

import network from "./network.fabric.js"

const chaincode = process.env.CHAINCODE_NAME

/**
 * @param {string} orgName 
 * @param {string} adminId 
 * @param {string} email 
 * @param {string} password 
 * @param {string} username 
 * @param {string} addrress 
 * @param {string} role 
 * @returns {}
 */
const signUp = async (orgName, adminId, email, password, username, addrress, role) => {
  const networkObj = await network.connect(orgName, adminId, chaincode)
  await network.invoke(networkObj, "SignUp", orgName, email, password, username, addrress, role)
  const res = await network.query(networkObj, "SignIn", email, password, orgName)
  await network.registerUser(orgName, JSON.parse(res).UserId, adminId)
}

/**
 * @param {string} orgName 
 * @param {string} email
 * @param {string} password
 * @returns {User}
 */
const signIn = async (orgName, userId, email, password) => {
  const networkObj = await network.connect(orgName, userId, chaincode)
  return await network.query(networkObj, "SignIn", email, password, orgName)
}

/**
 * 
 * @param {string} orgName 
 * @param {string} userId 
 * @param {string} password 
 * @param {string} username 
 * @param {string} address 
 * @param {string} status 
 * @returns 
 */
const changeInfoUser = async (orgName, userId, adminId, password, username, address, status) => {
  const networkObj = await network.connect(orgName, adminId, chaincode)
  await network.invoke(networkObj, "ChangeUserInfo", userId, password, username, address, status)
}

const importData = async () => {
  
  
  // Enroll admin and register user
  await network.enrollAdmin("supplier", "User1")
  let networkObj = await network.connect("supplier", "User1", chaincode)
  await network.invoke(networkObj, "SignUp", "supplier", "supplier@admin.com", "1234", "Supplier", "VN", "admin")
  await network.invoke(networkObj, "SignUp", "supplier", "supplier@user.com", "1234", "Supplier", "VN", "user")
  let res = await network.query(networkObj, "SignIn", "supplier@user.com", "1234", "supplier")
  await network.registerUser("supplier", JSON.parse(res).UserId, "User1")

  await network.enrollAdmin("manufacturer", "User3")
  networkObj = await network.connect("manufacturer", "User3", chaincode)
  await network.invoke(networkObj, "SignUp", "manufacturer", "manufacturer@admin.com", "1234", "Manufacturer", "VN", "admin")
  await network.invoke(networkObj, "SignUp", "manufacturer", "manufacturer@user.com", "1234", "Manufacturer", "VN", "user")
  res = await network.query(networkObj, "SignIn", "manufacturer@user.com", "1234", "manufacturer")
  await network.registerUser("manufacturer", JSON.parse(res).UserId, "User3")

  await network.enrollAdmin("distributor", "User5")
  networkObj = await network.connect("distributor", "User5", chaincode)
  await network.invoke(networkObj, "SignUp", "distributor", "distributor@admin.com", "1234", "Distributor", "VN", "admin")
  await network.invoke(networkObj, "SignUp", "distributor", "distributor@user.com", "1234", "Distributor", "VN", "user")
  res = await network.query(networkObj, "SignIn", "distributor@user.com", "1234", "distributor")
  await network.registerUser("distributor", JSON.parse(res).UserId, "User5")

  await network.enrollAdmin("retailer", "User7")
  networkObj = await network.connect("retailer", "User7", chaincode)
  await network.invoke(networkObj, "SignUp", "retailer", "retailer@admin.com", "1234", "Retailer", "VN", "admin")
  await network.invoke(networkObj, "SignUp", "retailer", "retailer@user.com", "1234", "Retailer", "VN", "user")
  res = await network.query(networkObj, "SignIn", "retailer@user.com", "1234", "retailer")
  await network.registerUser("retailer", JSON.parse(res).UserId, "User7")

  // Create 3 raw
  networkObj = await network.connect("supplier", "User2", chaincode)
  await network.invoke(networkObj, "CreateRaw", "User2", "Gold")
  await network.invoke(networkObj, "CreateRaw", "User2", "Wood")
  await network.invoke(networkObj, "CreateRaw", "User2", "Steel")

  // Odrer 2 raw 
  networkObj = await network.connect("manufacturer", "User4", chaincode)
  await network.invoke(networkObj, "OrderRaw", "User4", "Raw1", "User2")
  await network.invoke(networkObj, "OrderRaw", "User4", "Raw2", "User2")
  await network.invoke(networkObj, "OrderRaw", "User4", "Raw3", "User2")

  // Suply 2 raw
  networkObj = await network.connect("supplier", "User2", chaincode)
  await network.invoke(networkObj, "SupplyRaw", "User2", "Raw1", "User4")
  await network.invoke(networkObj, "SupplyRaw", "User2", "Raw2", "User4")
  await network.invoke(networkObj, "SupplyRaw", "User2", "Raw3", "User4")

  // Create/Update 1 product
  networkObj = await network.connect("manufacturer", "User4", chaincode)
  await network.invoke(networkObj, "CreateProduct", "User4", "TV", 1000, "ABC", "Raw1,Raw2")
  await network.invoke(networkObj, "UpdateProduct", "User4", "Product1", "Car", 20000, "XYZ", "Raw1,Raw3")

  // Order 1 product
  networkObj = await network.connect("retailer", "User8", chaincode)
  await network.invoke(networkObj, "OrderProduct", "User8", "Product1", "User4")

  // Provide 1 product
  networkObj = await network.connect("manufacturer", "User4", chaincode)
  await network.invoke(networkObj, "ProvideProduct", "User4", "Product1", "User8", "User6")

  // Delivery 1 product
  networkObj = await network.connect("distributor", "User6", chaincode)
  await network.invoke(networkObj, "DeliveryProduct", "User6", "Product1", "User4", "User8")

  // Receive 1 product
  networkObj = await network.connect("retailer", "User8", chaincode)
  await network.invoke(networkObj, "ReceiveProduct", "User8", "Product1", "User4", "User6")

  // Sell 1 product
  networkObj = await network.connect("retailer", "User8", chaincode)
  await network.invoke(networkObj, "SellProduct", "User8", "Product1")
}

export default {
  signIn,
  signUp,
  changeInfoUser,
  importData
}
