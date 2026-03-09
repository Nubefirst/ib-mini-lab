import express from 'express';
import { PORT } from './config/index.js';
import authRouter from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});