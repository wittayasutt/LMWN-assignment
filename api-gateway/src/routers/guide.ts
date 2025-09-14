import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { fetchGuideList, fetchGuideItem } from '../api';
import { guideSchema, guideListSchema } from '../schemas';
import { router, publicProcedure } from '../utils/trpc';

export const guideRouter = router({
	list: publicProcedure.output(guideListSchema).query(async () => {
		try {
			const { data: guideIds } = await fetchGuideList();

			return await Promise.all(
				guideIds.map(async (guideId: string) => {
					const { data: guide } = await fetchGuideItem(guideId);
					return guideSchema.parse(guide);
				}),
			);
		} catch (error) {
			console.error('Error TRPC fetching guide list', error);
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
		}
	}),
	item: publicProcedure
		.input(z.string())
		.output(guideSchema)
		.query(async ({ input }) => {
			try {
				const { data: guide } = await fetchGuideItem(input);
				return guideSchema.parse(guide);
			} catch (error) {
				console.error('Error TRPC fetching guide item', error);
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
			}
		}),
});
