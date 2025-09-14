import { restaurantApi, AxiosResponse } from '../utils';

export const fetchRestaurant = async (id: string): Promise<AxiosResponse> => {
	try {
		return await restaurantApi.get(`/restaurants/${id}`);
	} catch (error) {
		console.error('Error fetching restaurant', error);
		throw error;
	}
};
