import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middleware/rateLimiter.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

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