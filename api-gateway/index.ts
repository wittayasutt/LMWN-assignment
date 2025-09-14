import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext } from './src/middleware/context';
import { appRouter } from './src/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
		credentials: true,
	}),
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// tRPC middleware
app.use(
	'/api',
	createExpressMiddleware({
		router: appRouter,
		createContext,
		onError: ({ error, type, path }) => {
			console.error(`tRPC Error occured: on '${type}' at '${path}':`, error);
		},
	}),
);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on http://localhost:${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${(error as Error).message}`);
}
