import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import productRoutes from './routes/productRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
  app.use(morgan('dev'));
}

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Routes
app.use('/api/products', productRoutes);

// 404 and Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
