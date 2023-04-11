"use strict";

import model from "../models/transact.model.js";

const transactProductOrder = async (req, res) => {
  const { productId } = req.params;
  const { id, role } = req.body;

  let modelRes;
  if (role == "consumer") {
    modelRes = await model.orderProduct({ productId, id });
  }
  res.send(modelRes);
};

const transactProductSell = async (req, res) => {
  const { productId } = req.params;
  const { id, role } = req.body;

  let modelRes;
  if (role == "manufacturer") {
    modelRes = await model.sellProduct({ productId, id });
  }
  res.send(modelRes);
};

const transactProductDeliver = async (req, res) => {
  const { productId } = req.params;
  const { id, role } = req.body;

  let modelRes;
  if (role == "consumer") {
    modelRes = await model.deliverProduct({ productId, id });
  }
  res.send(modelRes);
};

const getAllTransact = async (req, res) => {
  const { id, role } = req.params;

  let modelRes;
  if (role == "consumer") {
    modelRes = await model.getAllTransact(false, true, { id });
  } else if (role == "manufacturer") {
    modelRes = await model.getAllTransact(true, false, { id });
  }
  res.send(modelRes);
};

export default {
  getAllTransact,
  transactProductDeliver,
  transactProductOrder,
  transactProductSell,
};
