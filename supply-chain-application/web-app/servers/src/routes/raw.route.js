"use strict"

import express from "express"
import controller from "../controllers/raw.controller.js"

const router = express.Router()

router.get("/:orgName/:userId", controller.getRaws)
router.get("/:orgName/:userId/:rawId", controller.getRaw)
router.get("/:orgName/:userId/:rawId/history", controller.getRawHistories)
router.post("/:supplierId/create", controller.createRaw)
router.post("/:supplierId/update", controller.updateRaw)
router.post("/:supplierId/supply", controller.supplyRaw)
router.post("/:manufacturerId/order", controller.orderRaw)

export default router