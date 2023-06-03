"use strict"

import userService from "../services/user.service.js"
import response from "../middlewares/response.middleware.js"
import handleError from "../middlewares/error.middleware.js"

const signUp = async (req, res) => {
  try {
    await userService.signUp(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const signIn = async (req, res) => {
  try {
    const rs = await userService.signIn(req.params, req.body)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const changeInfoUser = async (req, res) => {
  try {
    await userService.changeInfoUser(req.params, req.body)
    response(true, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getUsers = async (req, res) => {
  try {
    const rs = await userService.getUsers(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

const getUser = async (req, res) => {
  try {
    const rs = await userService.getUser(req.params)
    response(rs, res)
  } catch (err) {
    handleError(500, err, res)
  }
}

export default {
  getUsers,
  getUser,
  signIn,
  signUp,
  changeInfoUser
}
