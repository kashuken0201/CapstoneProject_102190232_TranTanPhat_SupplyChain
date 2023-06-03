"use strict"

import fabricAdmin from "../fabric/admin.fabric.js"
import fabricUtil from "../fabric/util.fabric.js"

const signIn = async (params, body) => {
  return await fabricAdmin.signIn(params.orgName, "User1", body.email, body.password)
}

const signUp = async (params, body) => {
  await fabricAdmin.signUp(params.orgName, body.adminId, body.email, body.password, body.username, body.address, body.role)
}

const changeInfoUser = async (params, body) => {
  await fabricAdmin.changeInfoUser(params.orgName, params.userId, body.adminId, body.password, body.username, body.address, body.status)
}

const getUser = async (params) => {
  const userFabric = await fabricUtil.getUser(params.orgName, params.userId)
  return userFabric
}

const getUsers = async (params) => {
  const userFabric = await fabricUtil.getUsers(params.orgName, params.adminId)
  return userFabric
}

const importData = async () => {
  await fabricAdmin.importData()
}

export default {
  getUsers,
  getUser,
  signIn,
  signUp,
  changeInfoUser,
  importData
}
