import type { PhotoType } from '@/types';

export type RestaurantWorkingHourType = {
	day: number;
	open: string;
	close: string;
};

export type RestaurantSocialType = {
	instagram?: string;
	facebook?: string;
};

export type RestaurantType = RestaurantSocialType & {
	id: string;
	name: string;
	description: string;
	photos: PhotoType[];
	rating: number;
	numberOfReviews: number;
	url: string;
	address: string;
	lat: number;
	lng: number;
	phoneNo: string;
	categories: string[];
	workingHours: RestaurantWorkingHourType[];
	official: boolean;
	delivery: boolean;
	pickup: boolean;
};
