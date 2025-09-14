import { fetchGuideList } from './api';
import { guideSchema } from './schemas';
import { router, publicProcedure } from '../utils/trpc';

export const guideRouter = router({
	list: publicProcedure.output(guideSchema).query(async () => {
		const response = await fetchGuideList();

		return guideSchema.parse(response);
	}),
});
