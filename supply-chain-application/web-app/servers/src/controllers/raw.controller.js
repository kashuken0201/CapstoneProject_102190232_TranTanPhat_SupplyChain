"use strict"

import rawService from "../services/raw.service.js"
import response from "../middlewares/response.middleware.js"
import handleError from "../middlewares/error.middleware.js"

const getRaw = async (req, res) => {
  try {
    const rs = await rawService.getRaw(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getRaws = async (req, res) => {
  try {
    const rs = await rawService.getRaws(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getRawHistories = async (req, res) => {
  try {
    const rs = await rawService.getRawHistories(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const createRaw = async (req, res) => {
  try {
    await rawService.createRaw(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const updateRaw = async (req, res) => {
  try {
    await rawService.updateRaw(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const supplyRaw = async (req, res) => {
  try {
    await rawService.supplyRaw(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const orderRaw = async (req, res) => {
  try {
    await rawService.orderRaw(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
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
