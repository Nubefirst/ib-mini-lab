import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middleware/rateLimiter.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */

const router = express.Router();

router.post("/login", loginLimiter, validate(loginSchema), asyncHandler(login));

router.post(
    "/register",
    validate(registerSchema),
    asyncHandler(register)
);

router.post(
    "/login",
    validate(loginSchema),
    loginLimiter,
    asyncHandler(login)
);

export default router;