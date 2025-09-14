import { z } from 'zod';

import { photoSchema } from './photo';

export const guideSchema = z.object({
	id: z.string(),
	title: z.string(),
	socialTitle: z.string().nullable().optional(),
	shortDescription: z.string().nullable().optional(),
	description: z.string().nullable().optional(),
	coverPhoto: photoSchema.optional(),
	tags: z.array(z.string()).optional(),
	writeDate: z.string().optional(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
});

export const guideListSchema = z.array(guideSchema);

export const guideDetailSchema = z.object({
	...guideSchema.shape,
	items: z.array(z.string()).optional(),
});
