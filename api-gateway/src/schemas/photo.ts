import { z } from 'zod';

export const photoSchema = z.object({
	id: z.string(),
	smallUrl: z.string().nullable().optional(),
	largeUrl: z.string().nullable().optional(),
});
