import express from 'express';
import healthRouter from "./routes/health.js";
import db from './config/db.js'
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(express.json());

db.query('SELECT NOW()')
    .then(res => console.log('DB connected:', res.rows[0]))
    .catch(err => console.error('DB error:', err));

app.use('/health', healthRouter);
app.use('/api/auth', authRoutes);

export default app;