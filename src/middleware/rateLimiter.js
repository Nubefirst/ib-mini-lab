import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 5, // максимум 5 попыток
    message: {
        message: "Too many login attempts. Try again later."
    }
});