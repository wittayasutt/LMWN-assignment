import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const guideApi = axios.create({
	baseURL: process.env.GUIDE_API_BASE_URL,
});

export const restaurantApi = axios.create({
	baseURL: process.env.RESTAURANT_API_BASE_URL,
});

export type { AxiosResponse };
