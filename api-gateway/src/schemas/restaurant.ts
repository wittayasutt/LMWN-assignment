import { z } from 'zod';

import { photoSchema } from './photo';

export const restaurantSocialSchema = z.object({
	instagram: z.string().nullable().optional(),
	facebook: z.string().nullable().optional(),
});

export const restaurantWorkingHourSchema = z.object({
	day: z.number(),
	open: z.string().nullable(),
	close: z.string().nullable(),
});

export const restaurantSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable().optional(),
	photos: z.array(photoSchema).optional(),
	rating: z.number().nullable().optional(),
	numberOfReviews: z.number().nullable().optional(),
	url: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
	lat: z.number().nullable().optional(),
	lng: z.number().nullable().optional(),
	phoneNo: z.string().nullable().optional(),
	categories: z.array(z.string()).optional(),
	workingHours: z.array(restaurantWorkingHourSchema).optional(),
	official: z.boolean().optional(),
	delivery: z.boolean().optional(),
	pickup: z.boolean().optional(),
	...restaurantSocialSchema.shape,
});
