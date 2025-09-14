import { router, publicProcedure } from '../utils/trpc';
import { z } from 'zod';

export const restaurantRouter = router({
	items: publicProcedure.input(z.string()).query(({ input }) => {
		return { name: 'item', id: input };
	}),
});
