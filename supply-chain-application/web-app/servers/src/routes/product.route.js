"use strict"

import express from "express"
import controller from "../controllers/product.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/create", authMiddleware.auth, controller.createProduct)
router.post("/:productId/update", authMiddleware.auth, controller.updateProduct)

router.get("/:productId", authMiddleware.auth, controller.getProduct)
router.get("/", authMiddleware.auth, controller.getProducts)

router.get("/:orgName/:userId/:productId/history", controller.getProductHistories)

router.post("/:productId/provide", authMiddleware.auth, controller.provideProduct)
router.post("/:productId/order", authMiddleware.auth, controller.orderProduct)
router.post("/:productId/receive", authMiddleware.auth, controller.receiveProduct)
router.post("/:productId/sell", authMiddleware.auth, controller.sellProduct)
router.post("/:productId/delivery", authMiddleware.auth, controller.deliveryProduct)

export default router
