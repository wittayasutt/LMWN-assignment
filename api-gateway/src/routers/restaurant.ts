import { z } from 'zod';

import { restaurantSchema } from '../schemas';
import { router, publicProcedure } from '../utils/trpc';
import { getRestaurantItemsByGuideId } from '../services';

export const restaurantRouter = router({
	items: publicProcedure
		.input(z.string())
		.output(z.array(restaurantSchema))
		.query(({ input }) => {
			return getRestaurantItemsByGuideId(input);
		}),
});
