"use strict";

import model from "../models/product.model.js";

const createProduct = async (req, res) => {
  const { id, name, price, manuName, desc } = req.body.product;

  const modelRes = await model.createProduct({
    name,
    id,
    price,
    manuName,
    desc,
  });
  res.send(modelRes);
};

const updateProduct = async (req, res) => {
  const { id, name, price, desc } = req.body.product;
  const { productId } = req.params;

  const modelRes = await model.updateProduct({
    productId,
    id,
    name,
    price,
    desc,
  });
  res.send(modelRes);
};

const getProductbyId = async (req, res) => {
  const { id, productId, role } = req.params;

  let modelRes = "";
  if (role === "manufacturer") {
    modelRes = await model.getProductById(true, false, { productId, id });
  } else if (role === "consumer") {
    modelRes = await model.getProductById(false, true, { productId, id });
  }
  res.send(modelRes);
};

const getAllProducts = async (req, res) => {
  const { id, role } = req.params;

  let modelRes = "";
  if (role === "manufacturer") {
    modelRes = await model.getAllProducts(true, false, { id });
  } else if (role === "consumer") {
    modelRes = await model.getAllProducts(false, true, { id });
  }
  res.send(modelRes);
};

const getLog = async (req, res) => {
  const { id, productId, role } = req.params;

  let modelRes = "";
  if (role === "manufacturer") {
    modelRes = await model.getLog(true, false, { productId, id });
  } else if (role === "consumer") {
    modelRes = await model.getLog(false, true, { productId, id });
  }
  res.send(modelRes);
};

export default {
  getAllProducts,
  getLog,
  getProductbyId,
  createProduct,
  updateProduct,
};
