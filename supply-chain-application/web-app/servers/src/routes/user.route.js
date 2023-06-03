"use strict"

import express from "express"
import controller from "../controllers/user.controller.js"

const router = express.Router()

router.post("/:orgName/signup", controller.signUp)
router.post("/:orgName/signin", controller.signIn)
router.get("/:orgName/:userId", controller.getUser)
router.post("/:orgName/:userId/update", controller.changeInfoUser)
router.get("/:orgName/admin/:adminId", controller.getUsers)

export default router