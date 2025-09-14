import { guideRouter } from './guide-rounter';
import { restaurantRouter } from './restaurant-rounter';

import { router, publicProcedure } from '../utils/trpc';

export const appRouter = router({
	getUser: publicProcedure.query(() => {
		return { name: 'getUser' };
	}),
	guide: guideRouter,
	restaurant: restaurantRouter,
});

export type AppRouter = typeof appRouter;
