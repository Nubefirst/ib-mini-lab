import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { getUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    requireRole("admin"),
    getUsers
);

export default router;