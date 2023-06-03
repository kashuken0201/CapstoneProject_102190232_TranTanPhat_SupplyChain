"use strict"

import fabricManufacturer from "../fabric/manufacturer.fabric.js"
import fabricDistributor from "../fabric/distributor.fabric.js"
import fabricRetailer from "../fabric/retailer.fabric.js"
import fabricUtil from "../fabric/util.fabric.js"

const createProduct = async (params, body) => {
  await fabricManufacturer.createProduct(params.manufacturerId, body.productName, body.price, body.description, body.rawIds)
}

const updateProduct = async (params, body) => {
  await fabricManufacturer.updateProduct(params.manufacturerId, body.productId, body.productName, body.price, body.description, body.rawIds)
}

const getProduct = async (params) => {
  const productFabric = await fabricUtil.getProduct(params.orgName, params.userId, params.productId)
  console.log(productFabric)
  return productFabric
}

const getProducts = async (params) => {
  const productFabric = await fabricUtil.getProducts(params.orgName, params.userId)
  return productFabric
}

const provideProduct = async (params, body) => {
  await fabricManufacturer.provideProduct(params.manufacturerId, body.productId, body.retailerId, body.distributorId)
}

const orderProduct = async (params, body) => {
  await fabricRetailer.orderProduct(params.retailerId, body.productId, body.manufacturerId)
}

const receiveProduct = async (params, body) => {
  await fabricRetailer.receiveProduct(params.retailerId, body.productId, body.manufacturerId, body.distributorId)
}

const sellProduct = async (params, body) => {
  await fabricRetailer.sellProduct(params.retailerId, body.productId)
}

const deliveryProduct = async (params, body) => {
  await fabricDistributor.deliveryProduct(params.distributorId, body.productId, body.manufacturerId, body.retailerId)
}

const getProductHistories = async (params) => {
  const productFabric = await fabricUtil.getProductHistories(params.orgName, params.userId, params.productId)
  return productFabric
}

export default {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  provideProduct,
  orderProduct,
  receiveProduct,
  sellProduct,
  deliveryProduct,
  getProductHistories
}