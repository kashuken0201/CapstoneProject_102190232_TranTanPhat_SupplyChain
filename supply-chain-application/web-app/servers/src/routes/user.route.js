"use strict";

import express from "express";
import controller from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", controller.getDashboard);

router.post("/", controller.signUp);
router.post("/login", controller.signIn);
router.post("/logout", authMiddleware.auth, controller.logOut);
router.get("/me", authMiddleware.auth, controller.infoUser);

router.post("/:organization/:userId/update", controller.changeInfoUser);
router.get("/:userId/info", authMiddleware.auth, controller.getUser);
router.get("/:organization", authMiddleware.auth, controller.getUsers);

export default router;
