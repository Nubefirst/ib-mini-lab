import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    requireRole("admin"),
    (req, res) => {

        res.json({
            message: "Admin access granted"
        });

    }
);

export default router;