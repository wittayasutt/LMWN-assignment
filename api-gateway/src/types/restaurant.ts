import { z } from 'zod';
import {
	restaurantSchema,
	restaurantSocialSchema,
	restaurantWorkingHourSchema,
} from '../schemas';

export type RestaurantType = z.infer<typeof restaurantSchema>;
export type RestaurantSocialType = z.infer<typeof restaurantSocialSchema>;
export type RestaurantWorkingHourType = z.infer<
	typeof restaurantWorkingHourSchema
>;

export type RestaurantItemResponseType = Omit<
	RestaurantType,
	'description' | 'photos'
>;
