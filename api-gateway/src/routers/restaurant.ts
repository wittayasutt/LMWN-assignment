import { z } from 'zod';

import { restaurantSchema } from '../schemas';
import { router, publicProcedure } from '../utils/trpc';

export const restaurantRouter = router({
	items: publicProcedure
		.input(z.string())
		.output(z.array(restaurantSchema))
		.query(({ input }) => {
			return { name: 'item', id: input };
		}),
});
