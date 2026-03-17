import express from 'express';
import { PORT } from './config/index.js';
import authRouter from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import auditRouter from "./routes/audit.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/audit", auditRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use(errorHandler);