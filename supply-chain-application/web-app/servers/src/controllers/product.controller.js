"use strict"

import productService from "../services/product.service.js"
import response from "../middlewares/response.middleware.js"
import handleError from "../middlewares/error.middleware.js"

const createProduct = async (req, res) => {
  try {
    await productService.createProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const provideProduct = async (req, res) => {
  try {
    await productService.provideProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const orderProduct = async (req, res) => {
  try {
    await productService.orderProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const receiveProduct = async (req, res) => {
  try {
    await productService.receiveProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const sellProduct = async (req, res) => {
  try {
    await productService.sellProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const deliveryProduct = async (req, res) => {
  try {
    await productService.deliveryProduct(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getProduct = async (req, res) => {
  try {
    const rs = await productService.getProduct(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getProducts = async (req, res) => {
  try {
    const rs = await productService.getProducts(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getProductHistories = async (req, res) => {
  try {
    const rs = await productService.getProductHistories(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  provideProduct,
  orderProduct,
  receiveProduct,
  sellProduct,
  deliveryProduct,
  getProductHistories
}
