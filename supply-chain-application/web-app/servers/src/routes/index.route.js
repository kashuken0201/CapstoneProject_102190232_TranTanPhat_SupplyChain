"use strict";

import express from "express";
import userRouter from "./user.route.js";
import rawRouter from "./raw.route.js";
import productRouter from "./product.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/raws", rawRouter);
router.use("/products", productRouter);

export default router;
