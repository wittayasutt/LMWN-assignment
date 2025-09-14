import { router, publicProcedure } from '../utils/trpc';
import { z } from 'zod';

export const guideRouter = router({
	list: publicProcedure.query(() => {
		return { name: 'list' };
	}),
	item: publicProcedure.input(z.string()).query(({ input }) => {
		return { name: 'item', id: input };
	}),
});
