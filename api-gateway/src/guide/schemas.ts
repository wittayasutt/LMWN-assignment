import { z } from 'zod';

export const coverPhotoSchema = z.object({
	id: z.string(),
	smallUrl: z.string(),
	largeUrl: z.string(),
});

export const guideSchema = z.object({
	id: z.string(),
	title: z.string(),
	socialTitle: z.string(),
	shortDescription: z.string(),
	description: z.string(),
	coverPhoto: coverPhotoSchema,
	tags: z.array(z.string()),
	writeDate: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	items: z.array(z.string()),
});
