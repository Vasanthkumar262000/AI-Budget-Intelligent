import path from 'path';
import { config } from 'dotenv';

// Load .env from repo root (monorepo) or apps/api
config({ path: path.resolve(process.cwd(), '../../.env') });
config({ path: path.resolve(process.cwd(), '.env') });

import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import helmet from 'helmet';
import { loadEnv } from './config/env';
import { getCorsOptions } from './config/cors';
import { errorHandler } from './middleware/error.middleware';
import { incomeRoutes } from './routes/income.routes';
import { expensesRoutes } from './routes/expenses.routes';
import { investmentsRoutes } from './routes/investments.routes';
import { savingsRoutes } from './routes/savings.routes';
import { subscriptionsRoutes } from './routes/subscriptions.routes';
import { aiRoutes } from './routes/ai.routes';
import { reportsRoutes } from './routes/reports.routes';

const env = loadEnv();
const app = express();

app.use(helmet());
app.use(cors(getCorsOptions(env.CORS_ORIGIN)));
app.use(express.json());
app.use(clerkMiddleware());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expenses', expensesRoutes);
app.use('/api/v1/investments', investmentsRoutes);
app.use('/api/v1/savings', savingsRoutes);
app.use('/api/v1/subscriptions', subscriptionsRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/reports', reportsRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});
