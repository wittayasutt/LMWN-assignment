import { router, publicProcedure } from '../utils/trpc';
// import { guideRouter } from '../guide';

export const appRouter = router({
	getUser: publicProcedure.query(() => {
		return { name: 'Bilbo' };
	}),
	// guide: guideRouter,
});

export type AppRouter = typeof appRouter;
