"use strict"

import fabricSupplier from "../fabric/supplier.fabric.js"
import fabricManufacturer from "../fabric/manufacturer.fabric.js"
import fabricUtil from "../fabric/util.fabric.js"

const createRaw = async (params, body) => {
  await fabricSupplier.createRaw(params.supplierId, body.rawName)
}

const updateRaw = async (params, body) => {
  await fabricSupplier.updateRaw(params.supplierId, body.rawId, body.rawName)
}

const getRaw = async (params) => {
  const rawFabric = await fabricUtil.getRaw(params.orgName, params.userId, params.rawId)
  return rawFabric
}

const getRaws = async (params) => {
  const rawFabric = await fabricUtil.getRaws(params.orgName, params.userId)
  return rawFabric
}

const getRawHistories = async (params) => {
  const rawFabric = await fabricUtil.getRawHistories(params.orgName, params.userId, params.rawId)
  return rawFabric
}

const supplyRaw = async (params, body) => {
  await fabricSupplier.supplyRaw(params.supplierId, body.rawId, body.manufacturerId)
}

const orderRaw = async (params, body) => {
  await fabricManufacturer.orderRaw(params.manufacturerId, body.rawId, body.supplierId)
}

export default {
  createRaw,
  updateRaw,
  getRaw,
  getRaws,
  getRawHistories,
  supplyRaw,
  orderRaw
}