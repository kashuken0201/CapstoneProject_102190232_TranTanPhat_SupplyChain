"use strict";

import express from "express";
import controller from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup/", controller.signup);
router.post("/signin/", controller.signin);
router.get("/info", controller.getInfoUser);
router.get("/", controller.getAllUser);

export default router;
