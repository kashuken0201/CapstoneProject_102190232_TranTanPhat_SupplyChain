"use strict"

import jwt from "jsonwebtoken"
import handleError from "./error.middleware.js"

const JWT_SECRET = process.env.JWT_SECRET

const isAuth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"]
    if (token) {
      if (!token.includes("Bearer")) {
        throw new Error();
      }
      token = token.replace('Bearer ', '')
      const user = jwt.verify(token, JWT_SECRET)
      if (req.session.uid == user.uid) {
        req.user = user
        next()
      }
      else throw new Error()

    }
    else {
      handleError(401, "unauthorize", res)
    }
  } catch (e) {
    handleError(401, "invalid token", res)
  }
};

const isAdmin = (req, res, next) => {
  let user = req.user
  if (user.role == "admin") {
    next()
  } else {
    handleError(403, "access denied", res)
  }
};

export default {
  isAdmin,
  isAuth
}