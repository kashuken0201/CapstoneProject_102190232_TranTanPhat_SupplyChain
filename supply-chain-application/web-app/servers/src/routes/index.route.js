"use strict"

import express from "express"
import userRouter from "./user.route.js"
import rawRouter from "./raw.route.js"
import productRouter from "./product.route.js"


const router = express.Router()

router.use("/user", userRouter)
router.use("/raw", rawRouter)
router.use("/product", productRouter)

export default router
