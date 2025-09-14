import { guideRouter } from './guide';
import { restaurantRouter } from './restaurant';
import { router } from '../utils/trpc';

export const appRouter = router({
	guide: guideRouter,
	restaurant: restaurantRouter,
});

export type AppRouter = typeof appRouter;
