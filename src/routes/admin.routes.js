import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
    getUsers,
    changeUserRole,
    removeUser
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    requireRole("admin"),
    getUsers
);

router.patch(
    "/users/:id/role",
    authMiddleware,
    requireRole("admin"),
    changeUserRole
);

router.delete(
    "/users/:id",
    authMiddleware,
    requireRole("admin"),
    removeUser
);

export default router;