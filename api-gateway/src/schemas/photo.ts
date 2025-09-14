import { z } from 'zod';

export const photoSchema = z.object({
	id: z.string(),
	smallUrl: z.string(),
	largeUrl: z.string(),
});
