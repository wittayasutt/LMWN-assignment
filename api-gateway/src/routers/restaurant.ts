import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { fetchGuideItem, fetchGuideItemDetail, fetchRestaurant } from '../api';
import { restaurantSchema } from '../schemas';
import { router, publicProcedure } from '../utils/trpc';

export const restaurantRouter = router({
	items: publicProcedure
		.input(z.string())
		.output(z.array(restaurantSchema))
		.query(async ({ input }) => {
			try {
				const { data: guide } = await fetchGuideItem(input);

				return await Promise.all(
					guide?.items?.map(async (guideItemId: string) => {
						const { data: guideItem } = await fetchGuideItemDetail(guideItemId);
						const { data: restaurant } = await fetchRestaurant(
							guideItem.restaurantId,
						);

						return restaurantSchema.parse({ ...guideItem, ...restaurant });
					}),
				);
			} catch (error) {
				console.error('Error TRPC fetching restaurants', error);
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
			}
		}),
});
