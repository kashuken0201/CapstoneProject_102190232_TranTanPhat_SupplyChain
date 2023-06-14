"use strict";

import express from "express";
import controller from "../controllers/raw.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware.auth, controller.getRaws);
router.get("/:rawId", authMiddleware.auth, controller.getRaw);

router.get("/:orgName/:userId/:rawId/history", controller.getRawHistories);

router.post("/create", authMiddleware.auth, controller.createRaw);
router.post("/:rawId/update", authMiddleware.auth, controller.updateRaw);
router.post("/:rawId/supply", authMiddleware.auth, controller.supplyRaw);
router.post("/:rawId/order", authMiddleware.auth, controller.orderRaw);

export default router;
