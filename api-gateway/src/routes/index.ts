import { router } from '../utils/trpc.js';
import { exampleRouter } from './example.js';

export const appRouter = router({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;