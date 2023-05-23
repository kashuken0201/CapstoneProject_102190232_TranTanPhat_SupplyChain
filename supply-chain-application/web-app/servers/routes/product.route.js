"use strict";

import express from "express";
import controller from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", controller.createProduct);
router.post("/:productId", controller.updateProduct);
router.get("/:productId/:role/:id", controller.getProductbyId);
router.get("/:role/:id", controller.getAllProducts);
router.get("/log/:productId/:role/:id", controller.getLog);

export default router;
