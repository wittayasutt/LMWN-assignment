import { router, publicProcedure } from '../utils/trpc';

export const exampleRouter = router({
	list: publicProcedure.query(() => {
		return {
			items: [],
		};
	}),
});
