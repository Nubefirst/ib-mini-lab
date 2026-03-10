import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { me } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, me);

export default router;