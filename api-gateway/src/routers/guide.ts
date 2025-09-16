import { z } from 'zod';

import { guideSchema, guideListSchema } from '../schemas';
import { router, publicProcedure } from '../utils/trpc';
import { getGuideList, getGuideItemById } from '../services';

export const guideRouter = router({
	list: publicProcedure.output(guideListSchema).query(() => {
		return getGuideList();
	}),
	item: publicProcedure
		.input(z.string())
		.output(guideSchema)
		.query(({ input }) => {
			return getGuideItemById(input);
		}),
});
