import { AxiosResponse } from 'axios';

import { axios } from '../utils';

export const fetchRestaurants = async (id: string): Promise<AxiosResponse> => {
	try {
		return await axios.get(`/restaurants/${id}`);
	} catch (error) {
		console.error('Error fetching restaurants', error);
		throw error;
	}
};
