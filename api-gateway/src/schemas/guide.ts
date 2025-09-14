import { z } from 'zod';

import { photoSchema } from './photo';

export const guideSchema = z.object({
	id: z.string(),
	title: z.string(),
	socialTitle: z.string(),
	shortDescription: z.string(),
	description: z.string(),
	coverPhoto: photoSchema,
	tags: z.array(z.string()),
	writeDate: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	items: z.array(z.string()),
});
