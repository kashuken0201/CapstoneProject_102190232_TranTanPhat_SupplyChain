"use strict"

import express from "express"
import controller from "../controllers/product.controller.js"

const router = express.Router()

router.post("/:manufacturerId/create", controller.createProduct)
router.post("/:manufacturerId/update", controller.updateProduct)
router.get("/:orgName/:userId/:productId", controller.getProduct)
router.get("/:orgName/:userId", controller.getProducts)
router.get("/:orgName/:userId/:productId/history", controller.getProductHistories)
router.post("/:manufacturerId/provide", controller.provideProduct)
router.post("/:retailerId/order", controller.orderProduct)
router.post("/:retailerId/receive", controller.receiveProduct)
router.post("/:retailerId/sell", controller.sellProduct)
router.post("/:distributorId/delivery", controller.deliveryProduct)

export default router
