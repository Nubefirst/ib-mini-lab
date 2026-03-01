import express from 'express';
import { PORT } from './config/index.js';
import healthRouter from './routes/health.js';

const app = express();

app.use('/health', healthRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})