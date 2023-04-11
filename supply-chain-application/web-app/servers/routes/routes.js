"use strict";

import express from "express";
import userRouter from "./user.routes.js";
import productRouter from "./product.routes.js";
import transactRouter from "./transact.routes.js";
import chaincodeRouter from "./chaincode.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/transact", transactRouter);
router.use("/chaincode", chaincodeRouter);

export default router;
