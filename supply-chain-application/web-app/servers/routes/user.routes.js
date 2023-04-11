"use strict";

import express from "express";
import controller from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup/:role", controller.signup);
router.get("/:role", controller.getAllUser);
router.post("/signin/:role", controller.signin);

export default router;
