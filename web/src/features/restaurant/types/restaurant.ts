import { Photo } from '@/types';

export type RestaurantWorkingHour = {
	day: number;
	open: string;
	close: string;
};

export type Restaurant = {
	id: string;
	name: string;
	description: string;
	photos: Photo[];
	rating: number;
	numberOfReviews: number;
	url: string;
	address: string;
	lat: number;
	lng: number;
	phoneNo: string;
	categories: string[];
	instagram: string;
	facebook: string;
	workingHours: RestaurantWorkingHour[];
	official: boolean;
	delivery: boolean;
	pickup: boolean;
};
