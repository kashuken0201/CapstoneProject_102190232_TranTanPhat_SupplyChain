"use strict";

import model from "../models/user.model.js";

const signup = async (req, res) => {
  const tmp = Object.values(req);
  const params = Object.values(tmp[0]);
  const ogrName = Object.values(tmp[1]).toString()
  const response = await user.signup(ogrName, params);
  res.send(response);
};

const signin = async (req, res) => {
  const { username, password, userType } = req.body;
  const { role } = req.params;

  let modelRes = "";
  if (role === "manufacturer") {
    modelRes = await model.signin(true, false, {
      username,
      password,
      userType,
    });
  } else if (role === "consumer") {
    modelRes = await model.signin(false, true, {
      username,
      password,
      userType,
    });
  }
  res.send(modelRes);
};

const getAllUser = async (req, res) => {
  const { role } = req.params;

  let modelRes = "";
  if (role === "manufacturer") {
    modelRes = await model.getAllUser(true, false);
  } else if (role === "consumer") {
    modelRes = await model.getAllUser(false, true);
  }
  res.send(modelRes);
};

const getInfoUser = async (req, res) => {
  res.send("")
};

export default {
  getAllUser,
  getInfoUser,
  signin,
  signup,
};
