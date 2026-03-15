import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
    asyncHandler(getUsers)
);

router.patch(
    "/users/:id/role",
    authMiddleware,
    requireRole("admin"),
    asyncHandler(changeUserRole)
);

router.delete(
    "/users/:id",
    authMiddleware,
    requireRole("admin"),
    asyncHandler(removeUser)
);

export default router;